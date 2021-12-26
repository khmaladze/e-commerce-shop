import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import db from "../../db/db";
import jwt from "jsonwebtoken";

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
    email: Joi.string()
      .email({ minDomainSegments: 1, tlds: { allow: ["com"] } })
      .required(),
    userPassword: Joi.string().lowercase().min(2).max(30).trim().required(),
  }),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    const { email, userPassword } = req.body;

    let userData = await db("user")
      .where({
        email: email,
        is_blocked: false,
      })
      .select("*");

    if (
      userData[0] &&
      bcrypt.compareSync(userPassword, userData[0].user_password)
    ) {
      let jwtSecret: any = process.env.JWT_SECRET;
      const token = jwt.sign({ user_id: userData[0].user_id }, jwtSecret);
      let shopList = await db("shop")
        .where({ shop_owner: userData[0].user_id, is_blocked: false })
        .select("*");
      res.send({
        success: true,
        token,
        userData: userData[0],
        shopList,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error,
      message: "Invalid Credentials",
    });
  }
};
