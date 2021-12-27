import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const userEndpointDesc = "This is how to login user (more description)";
export const TAGS = ["auth"];
export const requestSchema = Joi.object({
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  body: Joi.object(),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error,
    });
  }
};
