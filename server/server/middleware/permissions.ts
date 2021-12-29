// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response, NextFunction } from "express";

// eslint-disable-next-line import/prefer-default-export
export const permissionMiddleware = (allowPermissions: string[]) =>
  function permission(req: Request, res: Response, next: NextFunction) {
    console.log(allowPermissions);
    console.log(req.user?.permission);
    // NOTE: TODO permission logic
    // for (let permision of allowPermissions) {
    //   if (req.user?.permisions[] === permision) {
    //     next();
    //     return;
    //   }
    // }
    //
    if (allowPermissions[0] == req.user?.permission) {
      next();
    } else {
      res.status(401).json({ success: false, message: "Not credentials" });
    }
  };
