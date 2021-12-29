import express from "express";
import validationMiddleware from "../../middleware/validationMiddleware";
import * as user from "./put.user";
import requireAuthentication from "../../middleware/requireAuthentication";
import { permissionMiddleware } from "../../middleware/permissions";
let router = express.Router();

router.put(
  "/profile/update/:id",
  requireAuthentication,
  permissionMiddleware(["user"]),
  validationMiddleware(user.requestSchema),
  user.businessLogic
);

export default router;
