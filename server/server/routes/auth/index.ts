import express from "express";
import validationMiddleware from "../../middleware/validationMiddleware";
import * as register from "./post.register";
import * as login from "./post.login";
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

export default router;
