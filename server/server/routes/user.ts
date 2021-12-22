import express, { Request, Response } from "express";
import db from "../db/db";
import requireUserLogin from "../middleware/requireUserLogin";
import { updateUserSchema } from "../validation/validation";
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
      let validId = req.params.id.slice(1, 2);
      let userUpdate = await db("user")
        .where({
          user_id: validId,
        })
        .update({
          country: country,
          user_address: userAddress,
          user_password: userPassword,
        });
      res.send({ success: true });
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
