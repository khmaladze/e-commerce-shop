import express from "express";
import validationMiddleware from "../../middleware/validationMiddleware";
import * as register from "./post.register";
let router = express.Router();

router.post(
  "/register",
  validationMiddleware(register.requestSchema),
  register.businessLogic
);

export default router;
