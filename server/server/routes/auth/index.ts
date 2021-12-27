import express from "express";
import validationMiddleware from "../../middleware/validationMiddleware";
import * as register from "./post.register";
import * as login from "./post.login";
import * as test from "./test";
import requireUserLogin from "../../middleware/requireUserLogin";
let router = express.Router();

router.post(
  "/register",
  validationMiddleware(register.requestSchema),
  register.businessLogic
);

router.post(
  "/login",
  validationMiddleware(login.requestSchema),
  login.businessLogic
);

router.get(
  "/test",
  requireUserLogin,
  validationMiddleware(test.requestSchema),
  test.businessLogic
);

export default router;
