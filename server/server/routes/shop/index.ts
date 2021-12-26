import express from "express";
import validationMiddleware from "../../middleware/validationMiddleware";
import * as shop from "./post.shop";
import * as getshop from "./get.shop";
import * as myshop from "./get.myshop";
import requireUserLogin from "../../middleware/requireUserLogin";
let router = express.Router();

router.post(
  "/add/shop",
  requireUserLogin,
  validationMiddleware(shop.requestSchema),
  shop.businessLogic
);

router.get(
  "/shop",
  requireUserLogin,
  validationMiddleware(getshop.requestSchema),
  getshop.businessLogic
);

router.get(
  "/my/shop",
  requireUserLogin,
  validationMiddleware(myshop.requestSchema),
  myshop.businessLogic
);

export default router;
