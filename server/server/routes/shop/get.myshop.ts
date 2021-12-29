import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import db from "../../db/db";
import { User } from "../../interfaces/custom";
import { shop } from "../../utils/response.schema.items";

const userEndpointDesc = "This is endpoint to get user shop data";
export const TAGS = ["shop"];

export const requestSchema = Joi.object({
  headers: Joi.object()
    .keys({
      "user-agent": Joi.string().required(),
      authorization: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object(),
  query: Joi.object(),
  body: Joi.object(),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
  shop: shop.required(),
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    let shop = await db("shop")
      .where({ shop_owner: req.user?.user_id, is_blocked: false })
      .select("*");
    res.status(200).send({ success: true, shop });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
