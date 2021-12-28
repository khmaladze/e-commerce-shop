import express from "express";
import validationMiddleware from "../../middleware/validationMiddleware";
import * as shop from "./post.shop";
import * as getshop from "./get.shop";
import * as myshop from "./get.myshop";
import requireAuthentication from "../../middleware/requireAuthentication";
import { permissionMiddleware } from "../../middleware/permissions";
let router = express.Router();

router.post(
  "/add/shop",
  requireAuthentication,
  permissionMiddleware(["user"]),
  validationMiddleware(shop.requestSchema),
  shop.businessLogic
);

router.get(
  "/shop",
  requireAuthentication,
  validationMiddleware(getshop.requestSchema),
  getshop.businessLogic
);

router.get(
  "/my/shop",
  requireAuthentication,
  permissionMiddleware(["user"]),
  validationMiddleware(myshop.requestSchema),
  myshop.businessLogic
);

export default router;
