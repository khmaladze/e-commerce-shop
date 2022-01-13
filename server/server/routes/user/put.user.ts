import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import db from "../../db/db";
import { User } from "../../interfaces/custom";
import { userSchema } from "../../utils/response.schema.items";

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
    id: Joi.string().required(),
  }),
  query: Joi.object(),
  body: Joi.object({
    country: Joi.string().lowercase().min(2).max(50).required(),
    userImage: Joi.string().max(500).required(),
    userAddress: Joi.string().lowercase().min(2).max(50).required(),
    userPassword: Joi.string().lowercase().min(2).max(30).trim().required(),
    confirmPassword: Joi.string().valid(Joi.ref("userPassword")).required(),
  }).options({ convert: false }),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
  user: userSchema.required(),
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
    const time = new Date().toISOString();
    userUpdate = await db("user")
      .where({
        user_id: userId,
      })
      .update({
        country: country,
        user_address: userAddress,
        user_image: userImage,
        user_password: bcrypt.hashSync(userPassword, 12),
        updated_at: time,
      });
    let user = (await db("user")
      .where({ user_id: userId, is_blocked: false })
      .select("*")) as Array<User>;
    res.send({ success: true, user: user[0] });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
