import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import db from "../db/db";
import { User } from "../interfaces/custom";
import { appConfig } from "../app.config";

async function getUserById(user_id: string) {
  const userData = await db("user")
    .where({
      user_id: user_id,
      is_blocked: false,
    })
    .select("*");
  return userData?.[0] as User;
}

const requireAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ success: false, message: "Not authorized" });
  } else {
    const token = authorization?.replace("Bearer ", "");
    let jwtSecret = appConfig.JWT_SECRET;

    jwt.verify(token, jwtSecret, (err, payload) => {
      if (err) {
        res.status(401).json({ success: false, message: "Not authorized" });
      } else if (payload) {
        const { user_id } = payload;
        getUserById(user_id).then((user) => {
          if (user) {
            req.user = user;
            next();
          } else {
            res.status(401).json({ success: false, message: "Not authorized" });
          }
        });
      }
    });
  }
};

export default requireAuthentication;
