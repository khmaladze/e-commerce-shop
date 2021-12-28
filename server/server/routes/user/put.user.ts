import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import db from "../../db/db";
import { User } from "../../interfaces/custom";

const userEndpointDesc =
  "This is endpoint for some user details update like country, userImage, userAddress, userPassword";
export const TAGS = ["user"];

export const requestSchema = Joi.object({
  headers: Joi.object()
    .keys({
      "user-agent": Joi.string().required(),
      authorization: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  query: Joi.object(),
  body: Joi.object({
    country: Joi.string().lowercase().min(2).max(50).trim().required(),
    userImage: Joi.string().max(500).required(),
    userAddress: Joi.string().lowercase().min(2).max(50).trim().required(),
    userPassword: Joi.string().lowercase().min(2).max(30).trim().required(),
    confirmPassword: Joi.string().valid(Joi.ref("userPassword")).required(),
  }).options({ convert: false }),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
  newUserData: Joi.array().required(),
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    let { country, userAddress, userPassword, userImage, confirmPassword } =
      req.body;
    let userId = req.params.id;
    let userUpdate;
    if (userImage == "same") {
      userImage = req.user.user_image;
    }
    userUpdate = await db("user")
      .where({
        user_id: userId,
      })
      .update({
        country: country,
        user_address: userAddress,
        user_image: userImage,
        user_password: bcrypt.hashSync(userPassword, 12),
      });
    let newUserData = (await db("user")
      .where({ user_id: userId })
      .select("*")) as Array<User>;
    res.send({ success: true, data: newUserData });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
