import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import db from "../../db/db";
import { User } from "../../interfaces/custom";

const userEndpointDesc =
  "This is how to add swagger description for this endpoint";
export const TAGS = ["shop"];

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

interface customUserRequest extends Request {
  user?: User;
}

export const businessLogic = async (req: customUserRequest, res: Response) => {
  try {
    let shopList = await db("shop")
      .where({ shop_owner: req.user?.user_id, is_blocked: false })
      .select("*");
    res.status(200).send({ success: true, shopList });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error",
      error: error,
    });
  }
};