import express from "express";
import validationMiddleware from "../../middleware/validationMiddleware";
import requireAuthentication from "../../middleware/requireAuthentication";
import * as history from "./post.history";
import { permissionMiddleware } from "../../middleware/permissions";
let router = express.Router();

router.post(
  "/history",
  requireAuthentication,
  permissionMiddleware(["user"]),
  validationMiddleware(history.requestSchema),
  history.businessLogic
);

export default router;
