import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import db from "../../db/db";
import jwt from "jsonwebtoken";
import { onlyGmail } from "./validators";
import { Shop, User } from "../../interfaces/custom";
import { appConfig } from "../../app.config";
import { shop, user } from "../../utils/response.schema.items";

const userEndpointDesc =
  "this is how to login user you need to fill all the fields email and password. email must be gmail provider and also password must not be longer than 50";

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
  token: Joi.string().required(),
  user: user.required(),
  shop: shop,
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    const { email, userPassword } = req.body;

    let user = await getUserByEmail(email);

    if (user && bcrypt.compareSync(userPassword, user.user_password)) {
      let jwtSecret = appConfig.JWT_SECRET;
      const token = jwt.sign({ user_id: user.user_id }, jwtSecret);
      let shop = await getShopListByOwner(user.user_id);
      res.send({
        success: true,
        token,
        user,
        shop: shop[0],
      });
    } else {
      res
        .status(400)
        .send({ success: false, detail: [{ message: "Invalid Credentials" }] });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error,
    });
  }
};

async function getShopListByOwner(user_id: string) {
  return (await db("shop")
    .where({ shop_owner: user_id, is_blocked: false })
    .select("*")) as Array<Shop>;
}

async function getUserByEmail(email: string) {
  let user = await db("user")
    .where({
      email: email,
      is_blocked: false,
    })
    .select("*");
  return user[0] as User;
}
