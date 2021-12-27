import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import db from "../../db/db";

const userEndpointDesc =
  "This is how to add swagger description for this endpoint";
export const TAGS = ["product"];

export const requestSchema = Joi.object({
  headers: Joi.object()
    .keys({
      "user-agent": Joi.string().required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object(),
  query: Joi.object(),
  body: Joi.object(),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
});

export const businessLogic = async (req: Request | any, res: Response) => {
  try {
    let myShop = await db("shop")
      .where({ shop_owner: req.user[0].user_id })
      .select("shop_id");
    let products = await db("product")
      .where({ posted_by_shop: myShop[0].shop_id, is_blocked: false })
      .select("*");
    res.send({ success: true, products, myShop });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error",
      error: error,
    });
  }
};
