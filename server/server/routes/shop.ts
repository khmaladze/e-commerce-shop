import express, { Request, Response } from "express";
import db from "../db/db";
import requireUserLogin from "../middleware/requireUserLogin";
import { shopSchema } from "../validation/validation";
const router = express.Router();

router.post(
  "/add/shop",
  requireUserLogin,
  async (req: Request | any, res: Response) => {
    try {
      let { shopName, category, budget, shopImage } = req.body;

      let test = await shopSchema.validateAsync(req.body);
      if (shopName && category && budget && shopImage) {
        await db("shop").insert({
          shop_name: shopName,
          shop_owner: req.user[0].user_id,
          category: category,
          is_blocked: false,
          budget: budget,
          shop_image: shopImage,
        });

        res.send({ success: true });
      }
    } catch (error) {
      res.status(422).json({
        success: false,
        message: "Invalid Credentials",
        error: error,
      });
    }
  }
);
export default router;
