import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import db from "../../db/db";

const userEndpointDesc = "This endpoint get shop products created by user";
export const TAGS = ["product"];

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
  products: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
      })
    )
    .required(),
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
    let shop = await db("shop")
      .where({ shop_owner: req.user.user_id })
      .select("shop_id");
    let shopId = shop[0].shop_id;
    let products = await db("product")
      .where({ posted_by_shop: shopId, is_blocked: false })
      .select("*");
    res.send({ success: true, products, shop });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
