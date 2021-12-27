import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import db from "../../db/db";

const userEndpointDesc =
  "This is how to add swagger description for this endpoint";
export const TAGS = ["user"];

export const requestSchema = Joi.object({
  headers: Joi.object()
    .keys({
      "user-agent": Joi.string().required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object(),
  query: Joi.object(),
  body: Joi.object({
    country: Joi.string().lowercase().min(2).max(50).trim().required(),
    userImage: Joi.string().max(500).required(),
    userAddress: Joi.string().lowercase().min(2).max(50).trim().required(),
    userPassword: Joi.string().lowercase().min(2).max(30).trim().required(),
    confirmPassword: Joi.string().valid(Joi.ref("userPassword")).required(),
  }),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
});

export const businessLogic = async (req: Request | any, res: Response) => {
  try {
    let { country, userAddress, userPassword, userImage, confirmPassword } =
      req.body;
    let userId = req.params.id;
    console.log(userId);
    let validUserId = userId.substring(1, userId.length);
    console.log(validUserId);
    // let userId = req.query.Id;
    let userUpdate;
    if (userImage == "same") {
      userUpdate = await db("user")
        .where({
          user_id: validUserId,
        })
        .update({
          country: country,
          user_address: userAddress,
          user_image: req.user.user_image,
          user_password: bcrypt.hashSync(userPassword, 12),
        });
    } else {
      userUpdate = await db("user")
        .where({
          user_id: validUserId,
        })
        .update({
          country: country,
          user_address: userAddress,
          user_image: userImage,
          user_password: bcrypt.hashSync(userPassword, 12),
        });
    }
    let newUserData = await db("user")
      .where({ user_id: validUserId })
      .select("*");
    res.send({ success: true, data: newUserData[0] });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid Credentials", // ??
      error: error,
    });
  }
};