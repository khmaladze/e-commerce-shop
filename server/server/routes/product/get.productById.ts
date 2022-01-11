import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import db from "../../db/db";
import { Product } from "../../interfaces/custom";
import { productSchema } from "../../utils/response.schema.items";

const userEndpointDesc = "This endpoint get product by id created by user";
export const TAGS = ["product"];

export const requestSchema = Joi.object({
  headers: Joi.object()
    .keys({
      "user-agent": Joi.string().required(),
      authorization: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object({ productId: Joi.number() }),
  query: Joi.object(),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
  product: Joi.array().items(productSchema).required(),
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    let product = (await db("product")
      .where({
        product_id: req.params.productId,
        posted_by_user: req.user.user_id,
        is_blocked: false,
      })
      .select("*")) as Array<Product>;
    res.send({ success: true, product });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};