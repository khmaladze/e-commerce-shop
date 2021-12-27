import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import db from "../../db/db";
import jwt from "jsonwebtoken";
import { onlyGmail } from "./validators";

const userEndpointDesc = "This is how to login user (more description)";
export const TAGS = ["auth"];
export const requestSchema = Joi.object({
  headers: Joi.object()
    .keys({
      "user-agent": Joi.string().required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object(),
  query: Joi.object(),
  body: Joi.object({
    email: onlyGmail.required(),
    userPassword: Joi.string().lowercase().min(2).max(30).trim().required(),
  }),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    const { email, userPassword } = req.body;

    let user = await getUserByEmail(email);

    if (user && bcrypt.compareSync(userPassword, user.user_password)) {
      let jwtSecret: any = process.env.JWT_SECRET; // use config initialization for all env!!
      const token = jwt.sign({ user_id: user.user_id }, jwtSecret);
      let shopList = await getShopListByOwner(user.user_id);
      res.send({
        // your responseSchema should match this
        success: true,
        token,
        userData: user,
        shopList,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error,
      message: "Invalid Credentials", // ??
    });
  }
};

async function getShopListByOwner(user_id: string) {
  return await db("shop")
    .where({ shop_owner: user_id, is_blocked: false })
    .select("*");
}

async function getUserByEmail(email: string) {
  let userData = await db("user")
    .where({
      email: email,
      is_blocked: false,
    })
    .select("*");
  return userData[0];
}
