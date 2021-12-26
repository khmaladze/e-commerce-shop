import express from "express";
import requireUserLogin from "../../middleware/requireUserLogin";
import validationMiddleware from "../../middleware/validationMiddleware";
import * as product from "./post.product";
import * as products from "./get.product";
import * as myproducts from "./get.myproducts";
import * as updateproduct from "./put.updateproduct";
import * as delproduct from "./delete.delproduct";
import * as myuserproduct from "./get.myuserproducts";
import * as updateuserproduct from "./put.updateproductsuser";
let router = express.Router();

router.post(
  "/add/product",
  requireUserLogin,
  validationMiddleware(product.requestSchema),
  product.businessLogic
);

router.get(
  "/products",
  validationMiddleware(products.requestSchema),
  products.businessLogic
);

router.get(
  "/my/products",
  requireUserLogin,
  validationMiddleware(myproducts.requestSchema),
  myproducts.businessLogic
);

router.put(
  "/my/user/products/:id",
  requireUserLogin,
  validationMiddleware(updateuserproduct.requestSchema),
  updateuserproduct.businessLogic
);

router.get(
  "/my/products/user",
  requireUserLogin,
  validationMiddleware(myuserproduct.requestSchema),
  myuserproduct.businessLogic
);

router.put(
  "/my/products/:id",
  requireUserLogin,
  validationMiddleware(updateproduct.requestSchema),
  updateproduct.businessLogic
);

router.delete(
  "/my/products/:id",
  requireUserLogin,
  validationMiddleware(delproduct.requestSchema),
  delproduct.businessLogic
);
export default router;
