import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import os from "os";
import bcrypt from "bcrypt";
import db from "../../db/db";
// import { joiValidationError } from '../utils/external.validation.error'

const userEndpointDesc =
  "This is how to add swagger description for this endpoint";

export const requestSchema = Joi.object({
  headers: Joi.object()
    .keys({
      "user-agent": Joi.string().required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object(),
  query: Joi.object(),
  body: Joi.object({
    firstName: Joi.string()
      .pattern(/^[a-z]+$/)
      .lowercase()
      .min(2)
      .max(50)
      .trim()
      .required(),
    lastName: Joi.string()
      .pattern(/^[a-z]+$/)
      .lowercase()
      .min(2)
      .max(100)
      .trim()
      .required(),
    birthDate: Joi.string().isoDate().required(),
    country: Joi.string().lowercase().min(2).max(50).trim().required(),
    userAddress: Joi.string().lowercase().min(2).max(100).trim().required(),
    email: Joi.string()
      .email({ minDomainSegments: 1, tlds: { allow: ["gmail.com"] } })
      .required(),
    userPassword: Joi.string().lowercase().min(2).max(30).trim().required(),
    userCard: Joi.string().lowercase().length(10).trim().required(),
    cardPassword: Joi.string().length(4).required(),
    budget: Joi.string().lowercase().min(2).max(50).trim().required(),
    confirmPassword: Joi.any().valid(Joi.ref("userPassword")).required(),
  }),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
});

export const businessLogic = async (req: Request, res: Response) => {
  // get data from body
  const {
    email,
    userCard,
    firstName,
    lastName,
    birthDate,
    country,
    userAddress,
    userPassword,
    cardPassword,
    budget,
    confirmPassword,
  } = req.body;

  try {
    let ipAddress = req.ip;
    let browserType = req.headers["user-agent"];

    let userImage =
      "https://res.cloudinary.com/dtlhyd02w/image/upload/v1638523630/frdmwjc5jtxv0eobisd0.png";

    let user = await db("user").insert({
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate,
      country: country,
      user_address: userAddress,
      email: email,
      user_password: bcrypt.hashSync(userPassword, 12),
      user_card: userCard,
      card_password: bcrypt.hashSync(cardPassword, 12),
      is_blocked: false,
      budget: budget,
      user_image: userImage,
      ip_address: ipAddress,
      browser_type: browserType,
    });
    res.send({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
