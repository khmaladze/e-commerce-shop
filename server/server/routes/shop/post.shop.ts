import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import db from "../../db/db";

const userEndpointDesc =
  "This is endpoint for user to create their shop and add products by them";

export const TAGS = ["shop"];

export const requestSchema = Joi.object({
  headers: Joi.object()
    .keys({
      "user-agent": Joi.string().required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object(),
  query: Joi.object(),
  body: Joi.object({
    shopName: Joi.string().max(50).required(),
    category: Joi.number().required(),
    budget: Joi.string().required(),
    shopImage: Joi.string().required(),
    shopBackgroundImage: Joi.string().required(),
  }).options({ convert: false }),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    let { shopName, category, budget, shopImage, shopBackgroundImage } =
      req.body;

    await db("shop").insert({
      shop_name: shopName,
      shop_owner: req.user.user_id,
      category: category,
      is_blocked: false,
      budget: budget,
      shop_image: shopImage,
      shop_background_image: shopBackgroundImage,
    });

    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
