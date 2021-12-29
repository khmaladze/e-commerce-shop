import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import db from "../../db/db";
import { product } from "../../utils/response.schema.items";

const userEndpointDesc =
  "This endpoint get user products created as only individual by user  ";
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
  products: Joi.array().items(product).required(),
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    let products = await db("product")
      .where({ posted_by_user: req.user.user_id, is_blocked: false })
      .select("*");
    res.send({ success: true, products });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
