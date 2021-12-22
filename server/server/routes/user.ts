import express, { Request, Response } from "express";
import db from "../db/db";
import requireUserLogin from "../middleware/requireUserLogin";
import { updateUserSchema } from "../validation/validation";
import bcrypt from "bcrypt";
const router = express.Router();

///////////////////////////
// /*   Update User   */ //
///////////////////////////
router.put(
  "/user/:id",
  requireUserLogin,
  async (req: Request, res: Response) => {
    try {
      let { country, userAddress, userPassword, confirmPassword } = req.body;
      let test = await updateUserSchema.validateAsync(req.body);
      let userId = req.params.id;
      console.log(userId);
      let validUserId = userId.substring(1, userId.length);
      console.log(validUserId);
      // let userId = req.query.Id;
      let userUpdate = await db("user")
        .where({
          user_id: validUserId,
        })
        .update({
          country: country,
          user_address: userAddress,
          user_password: bcrypt.hashSync(userPassword, 12),
        });
      let newUserData = await db("user")
        .where({ user_id: validUserId })
        .select("*");
      res.send({ success: true, data: newUserData[0] });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Invalid Credentials",
        error: error,
      });
    }
  }
);

export default router;
