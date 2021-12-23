import express, { Request, Response, Router } from "express";
import db from "../db/db";
import requireUserLogin from "../middleware/requireUserLogin";
import { shopSchema } from "../validation/validation";
const router = express.Router();

///////////////////////////
// /*   Add Shop      */ //
///////////////////////////
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

        res.status(20).send({ success: true });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Invalid Credentials",
        error: error,
      });
    }
  }
);

///////////////////////////
// /*   Get Shop     */  //
///////////////////////////
router.get("/shop", async (req: Request, res: Response) => {
  try {
    let shopList = await db("shop").where({ is_blocked: false }).select("*");
    res.status(200).send({ success: true, shopList });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error",
      error: error,
    });
  }
});

///////////////////////////
// /* Get Owner Shop */  //
///////////////////////////
router.get(
  "/my/shop",
  requireUserLogin,
  async (req: Request | any, res: Response) => {
    try {
      let shopList = await db("shop")
        .where({ shop_owner: req.user[0].user_id, is_blocked: false })
        .select("*");
      res.status(200).send({ success: true, shopList });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error",
        error: error,
      });
    }
  }
);

export default router;
