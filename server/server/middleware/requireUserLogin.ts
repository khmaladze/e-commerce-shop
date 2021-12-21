import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import db from "../db/db";
const requireUserLogin = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ error: "you must be loged in" });
  } else {
    const token: any = authorization?.replace("Bearer ", "");
    let jwtSecret: any = process.env.JWT_SECRET;

    jwt.verify(token, jwtSecret, (err: any, payload: any) => {
      if (err) {
        res.status(401).json({ error: "you must be logged in" });
      }

      const { user_id } = payload;
      let userData = db("user")
        .where({
          user_id: user_id,
          is_blocked: false,
        })
        .select("*");
      next();
    });
  }
};

export default requireUserLogin;
