import express, { Request, Response } from "express";
import db from "../db/db";
import requireUserLogin from "../middleware/requireUserLogin";
import { productSchema } from "../validation/validation";
const router = express.Router();

///////////////////////////
// /*  Add Product   */  //
///////////////////////////
router.post(
  "/add/product",
  requireUserLogin,
  async (req: Request | any, res: Response) => {
    try {
      const {
        title,
        productDescription,
        category,
        price,
        productCount,
        productImage,
      } = req.body;
      type requestedByType = "user" | "shop";
      let requestedBy: requestedByType = req.body.requestedBy;
      let test = await productSchema.validateAsync(req.body);
      let postedById;
      if (requestedBy == "user") {
        postedById = req.user[0].user_id;
      } else {
        let shopId = await db("shop")
          .where({
            shop_owner: req.user[0].user_id,
          })
          .select("shop_id");
        console.log(shopId);
        console.log(shopId[0].shop_id);
        postedById = shopId[0].shop_id;
      }
      if (requestedBy == "user") {
        let productData = await db("product").insert({
          title: title,
          product_description: productDescription,
          category: category,
          price: price,
          product_count: productCount,
          is_blocked: false,
          product_image: productImage,
          posted_by_user: postedById,
        });
      } else {
        let productData = await db("product").insert({
          title: title,
          product_description: productDescription,
          category: category,
          price: price,
          product_count: productCount,
          is_blocked: false,
          product_image: productImage,
          posted_by_shop: postedById,
        });
      }
      res.send({ success: true });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error",
        error: error,
      });
    }
  }
);

///////////////////////////
// /* Get Products   */  //
///////////////////////////
router.get("/products", async (req: Request, res: Response) => {
  try {
    let products = await db("product").where({ is_blocked: false }).select("*");
    res.send({ success: true, products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error",
      error: error,
    });
  }
});

///////////////////////////
///* Get User Product  *///
///////////////////////////
router.get(
  "/my/products",
  requireUserLogin,
  async (req: Request | any, res: Response) => {
    try {
      let myShop = await db("shop")
        .where({ shop_owner: req.user[0].user_id })
        .select("shop_id");
      let products = await db("product")
        .where({ posted_by_shop: myShop[0].shop_id, is_blocked: false })
        .select("*");
      res.send({ success: true, products, myShop });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error",
        error: error,
      });
    }
  }
);

///////////////////////////
///*Update User Product*///
///////////////////////////
/*We NEED To Finish THIS */
router.put(
  "/my/products/:id",
  requireUserLogin,
  async (req: Request | any, res: Response) => {
    try {
      let myShop = await db("shop")
        .where({ shop_owner: req.user[0].user_id })
        .select("shop_id");
      let products = await db("product")
        .where({ posted_by_shop: myShop[0].shop_id, is_blocked: false })
        .select("*");
      res.send({ success: true, products, myShop });
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
