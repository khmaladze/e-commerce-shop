import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import db from "../../db/db";

const userEndpointDesc =
  "This is how to add swagger description for this endpoint";
export const TAGS = ["history"];

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
// dont use 'any' type
export const businessLogic = async (req: Request | any, res: Response) => {
  try {
    let { productId } = req.body;
    let saveData = await db("history").insert({
      product_id: productId,
      person_id: req.user[0].user_id,
    });
    res.send({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid Credentials", //??
      error: error,
    });
  }
};
