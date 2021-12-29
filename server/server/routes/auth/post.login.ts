import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import db from "../../db/db";
import jwt from "jsonwebtoken";
import { onlyGmail } from "./validators";
import { User } from "../../interfaces/custom";
import { appConfig } from "../../app.config";

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
  user: Joi.object({
    user_id: Joi.string().required(),
    first_name: Joi.string().required(),
    birth_date: Joi.date().required(),
    country: Joi.string().required(),
    user_address: Joi.string().required(),
    email: Joi.string().required(),
    user_password: Joi.string().required(),
    user_card: Joi.string().required(),
    card_password: Joi.string().required(),
    is_blocked: false,
    budget: Joi.string().required(),
    user_image: Joi.string(),
    ip_address: Joi.string().required(),
    browser_type: Joi.string().required(),
    created_at: Joi.string().required(),
    updated_at: Joi.string().required(),
  }).required(),
  shop: Joi.array()
    .items(
      Joi.object({
        shop_id: Joi.string().required(),
        shop_name: Joi.string().required(),
        shop_owner: Joi.string().required(),
        category: Joi.string().required(),
        is_blocked: false,
        budget: Joi.string().required(),
        shop_image: Joi.string().required(),
      })
    )
    .required(),
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
        shop,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error,
    });
  }
};
interface Shop {
  // .....
}
async function getShopListByOwner(user_id: string) {
  return (await db("shop")
    .where({ shop_owner: user_id, is_blocked: false })
    .select("*")) as Array<Shop>;
}

async function getUserByEmail(email: string) {
  let userData = await db("user")
    .where({
      email: email,
      is_blocked: false,
    })
    .select("*");
  return userData[0] as User;
}
