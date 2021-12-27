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
  body: Joi.object({
    shopName: Joi.string().max(50).required(),
    category: Joi.string().required(),
    budget: Joi.string().required(),
    shopImage: Joi.string().required(),
  }),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
});

interface customUserRequest extends Request {
  user?: User;
}

export const businessLogic = async (req: customUserRequest, res: Response) => {
  try {
    let { shopName, category, budget, shopImage } = req.body;

    if (shopName && category && budget && shopImage) {
      await db("shop").insert({
        shop_name: shopName,
        shop_owner: req.user?.user_id,
        category: category,
        is_blocked: false,
        budget: budget,
        shop_image: shopImage,
      });

      res.status(200).send({ success: true });
    } else {
      res.status(400).json({
        success: false,
        message: "Can't create",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
