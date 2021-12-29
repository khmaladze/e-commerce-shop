import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import db from "../../db/db";

const userEndpointDesc =
  "This is For Product Buy History we get info like product id and person id and we save it data and get info when you buy it";

export const TAGS = ["history"];

export const requestSchema = Joi.object({
  headers: Joi.object()
    .keys({
      "user-agent": Joi.string().required(),
      authorization: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object(),
  query: Joi.object(),
  body: Joi.object({
    productId: Joi.number().required(),
  }),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    let { productId } = req.body;
    let saveData = await db("history").insert({
      product_id: productId,
      person_id: req.user.user_id,
    });
    res.send({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
