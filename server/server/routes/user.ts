import express, { Request, Response } from "express";
import db from "../db/db";
import requireUserLogin from "../middleware/requireUserLogin";
import { updateUserSchema } from "../validation/validation";
import bcrypt from "bcrypt";
const router = express.Router();

///////////////////////////
// /*   Update User   */ //
///////////////////////////
router.put("/user", requireUserLogin, async (req: Request, res: Response) => {
  try {
    let { country, userAddress, userPassword, confirmPassword } = req.body;
    let test = await updateUserSchema.validateAsync(req.body);
    let userId = req.query.Id;
    let userUpdate = await db("user")
      .where({
        user_id: userId,
      })
      .update({
        country: country,
        user_address: userAddress,
        user_password: bcrypt.hashSync(userPassword, 12),
      });
    res.send({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid Credentials",
      error: error,
    });
  }
});

export default router;
