import express from "express";
import validationMiddleware from "../../middleware/validationMiddleware";
import requireUserLogin from "../../middleware/requireUserLogin";
import * as history from "./post.history";
let router = express.Router();

router.post(
  "/history",
  requireUserLogin,
  validationMiddleware(history.requestSchema),
  history.businessLogic
);

export default router;
