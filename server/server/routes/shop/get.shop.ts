import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import db from "../../db/db";
import { Shop } from "../../interfaces/custom";
import { shopSchema } from "../../utils/response.schema.items";

const userEndpointDesc = "This is endpoint to get all allowed shop";
export const TAGS = ["shop"];

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
  shop: Joi.array().items(shopSchema).required(),
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    let shop = (await db("shop")
      .where({ is_blocked: false })
      .select("*")) as Array<Shop>;
    res.status(200).send({ success: true, shop });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
