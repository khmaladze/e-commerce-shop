import express, { Request, Response } from "express";
import db from "../db/db";
import requireUserLogin from "../middleware/requireUserLogin";
const router = express.Router();

router.post(
  "/history",
  requireUserLogin,
  async (req: Request | any, res: Response) => {
    try {
      let { productId } = req.body;
      let saveData = await db("history").insert({
        product_id: productId,
        person_id: req.user[0].user_id,
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
