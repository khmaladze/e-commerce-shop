import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import db from "../../db/db";
import { Product } from "../../interfaces/custom";
import { productSchema } from "../../utils/response.schema.items";

const userEndpointDesc =
  "This enpoint get all latest created products added by shop or individual user";
export const TAGS = ["product"];

export const requestSchema = Joi.object({
  headers: Joi.object()
    .keys({
      "user-agent": Joi.string().required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object(),
  query: Joi.object(),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
  products: Joi.array().items(productSchema).required(),
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    let products = (await db("product")
      .where({ is_blocked: false })
      .orderBy("created_at", "desc")
      .limit(3)
      .select("*")) as Array<Product>;
    res.send({ success: true, products });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
