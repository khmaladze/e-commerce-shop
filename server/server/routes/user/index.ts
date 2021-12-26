import express from "express";
import validationMiddleware from "../../middleware/validationMiddleware";
import * as user from "./put.user";
import requireUserLogin from "../../middleware/requireUserLogin";
let router = express.Router();

router.post(
  "/add/shop",
  requireUserLogin,
  validationMiddleware(user.requestSchema),
  user.businessLogic
);

export default router;
