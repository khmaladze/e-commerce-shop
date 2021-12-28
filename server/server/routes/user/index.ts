import express from "express";
import validationMiddleware from "../../middleware/validationMiddleware";
import * as user from "./put.user";
import requireUserLogin from "../../middleware/requireUserLogin";
import { permissionMiddleware } from "../../middleware/permissions";
let router = express.Router();

router.put(
  "/profile/update/:id",
  requireUserLogin,
  permissionMiddleware(["admin"]),
  validationMiddleware(user.requestSchema),
  user.businessLogic
);

export default router;
