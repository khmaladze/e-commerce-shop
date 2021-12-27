import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import db from "../db/db";
interface User {
  user_id: string;
}

async function getUserById(user_id: string) {
  const userData = await db("user")
    .where({
      user_id: user_id,
      is_blocked: false,
    })
    .select("*");
  // if (userData.length > 0) {
  //   return userData[0];
  // }
  // return undefined;
  console.log(userData);
  return userData?.[0] as User; // this is equivalent
}

// dont use 'any' type
const requireUserLogin = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ error: "Not authorized" });
  } else {
    const token = authorization?.replace("Bearer ", "");
    let jwtSecret = process.env.JWT_SECRET ?? "DEFOULT_JWT_SECRET"; // check it before server starting you should have InitConfigServer

    jwt.verify(token, jwtSecret, (err, payload) => {
      if (err) {
        res.status(401).json({ error: "Not authorized" });
      } else if (payload) {
        const { user_id } = payload;
        getUserById(user_id).then((user) => {
          if (user) {
            // use it for fix this ignore for context
            // https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
            //@ts-ignore
            req.user = user;
            next();
          } else {
            res.status(401).json({ error: "Not authorized" });
          }
        });
      }
    });
  }
};

export default requireUserLogin;
