import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
import db from "../db/db";
import os from "os";
import authSchema from "../validation/validation";
import bcrypt from "bcrypt";
import { isValidEmail, isValidGmailProvider } from "../validation/validation";
import jwt from "jsonwebtoken";
import requireUserLogin from "../middleware/requireUserLogin";

router.get("/test", requireUserLogin, (req, res) => {
  res.send("ok");
});

///////////////////////////
// /* Register user  */  //
///////////////////////////
router.post("/register", async (req: Request, res: Response) => {
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
    // isBlocked,
    budget,
    confirmPassword,
  } = req.body;
  // check if fields not empty

  try {
    let test = await authSchema.validateAsync(req.body);

    // let test = await authSchema.validateAsync(req.body);

    let ipAddress = req.ip || "0";
    let browserType = req.headers["user-agent"] || "0";
    let operationSystem = os.type() || "0";
    let operationSystemRelease = os.release() || "0";
    let operationSystemPlatform = os.platform() || "0";
    let operationSystemCpu = os.cpus()[0].model || "0";
    let homeDir = os.homedir() || "0";
    let hostname = os.hostname() || "0";
    let operationSystemUsername = os.userInfo().username || "0";
    let operationSystemVersion = os.version() || "0";
    if (
      !ipAddress ||
      !operationSystem ||
      !operationSystemRelease ||
      !operationSystemPlatform ||
      !operationSystemCpu ||
      !homeDir ||
      !hostname ||
      !operationSystemUsername ||
      !operationSystemVersion ||
      !browserType
    ) {
      res
        .status(422)
        .json({ success: false, error: "please add all the fields" });
    }
    // console.log(
    //   firstName,
    //   lastName,
    //   birthDate,
    //   country,
    //   userAddress,
    //   email,
    //   userCard,
    //   false,
    //   budget,
    //   userImage,
    //   ipAddress,
    //   browserType,
    //   operationSystemCpu,
    //   homeDir,
    //   hostname,
    //   operationSystemUsername,
    //   operationSystemVersion,
    //   operationSystem,
    //   operationSystemRelease,
    //   operationSystemPlatform
    // );

    if (isValidEmail(email) && isValidGmailProvider(email)) {
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
        user_cpu: operationSystemCpu,
        homedir: homeDir,
        hostname: hostname,
        os_username: operationSystemUsername,
        os_version: operationSystemVersion,
        user_os: operationSystem,
        user_os_release: operationSystemRelease,
        user_os_platform: operationSystemPlatform,
      });
      res.send({ success: true });
    } else {
      res.status(400).end({
        success: false,
        error: "Invalid credemtials",
      });
    }
  } catch (error) {
    res.status(422).json({
      success: false,
      message: "Invalid Credentials",
      error: error,
    });
  }
});

///////////////////////////
// /* Login users */  //
///////////////////////////
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, userPassword } = req.body;
    // check if req.body is empty
    if (!email || !userPassword || (!email && !userPassword)) {
      return res
        .status(400)
        .send({ success: false, error: "Please add all the fields" });
    } // check if email is valid
    else if (
      !isValidEmail(email) ||
      !isValidGmailProvider(email) ||
      (!isValidEmail(email) && !isValidGmailProvider(email))
    ) {
      res.status(400).send({
        success: false,
        error: "Invalid email only @gmail.com allowed",
      });
    } else {
      let userData = await db("user")
        .where({
          email: email,
          is_blocked: false,
        })
        .select("*");

      if (
        userData[0] &&
        bcrypt.compareSync(userPassword, userData[0].user_password)
      ) {
        let jwtSecret: any = process.env.JWT_SECRET;
        const token = jwt.sign({ user_id: userData[0].user_id }, jwtSecret);
        res.send({ success: true, token, userData: userData[0] });
      } else {
        res.status(400).send({
          success: "false",
          message: "Invalid Credentials",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error,
      message: "Invalid Credentials",
    });
  }
});

export default router;
