import express from "express";
import requireAuthentication from "../../middleware/requireAuthentication";
import validationMiddleware from "../../middleware/validationMiddleware";
import * as product from "./post.product";
import * as products from "./get.product";
import * as myproducts from "./get.myproducts";
import * as updateproduct from "./put.updateproduct";
import * as delproduct from "./delete.product";
import * as myuserproduct from "./get.myuserproducts";
import * as updateuserproduct from "./put.updateproductsuser";
import * as getProductByIdFromUser from "./get.productById";
import * as latestProduct from "./get.latestProduct";
import * as lowestPrice from "./get.lowestPrice";
import * as sale from "./get.sale";
import { permissionMiddleware } from "../../middleware/permissions";
let router = express.Router();

router.get(
  "/get/latest/product",
  validationMiddleware(latestProduct.requestSchema),
  latestProduct.businessLogic
);

router.get(
  "/get/lowestprice/product",
  validationMiddleware(lowestPrice.requestSchema),
  lowestPrice.businessLogic
);

router.get(
  "/get/sale",
  validationMiddleware(sale.requestSchema),
  sale.businessLogic
);

router.get(
  "/get/product/:productId",
  validationMiddleware(getProductByIdFromUser.requestSchema),
  getProductByIdFromUser.businessLogic
);

router.post(
  "/add/product",
  requireAuthentication,
  permissionMiddleware(["user"]),
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
  requireAuthentication,
  permissionMiddleware(["user"]),
  validationMiddleware(myproducts.requestSchema),
  myproducts.businessLogic
);

router.put(
  "/my/user/products/:id",
  requireAuthentication,
  permissionMiddleware(["user"]),
  validationMiddleware(updateuserproduct.requestSchema),
  updateuserproduct.businessLogic
);

router.get(
  "/my/products/user",
  requireAuthentication,
  permissionMiddleware(["user"]),
  validationMiddleware(myuserproduct.requestSchema),
  myuserproduct.businessLogic
);

router.put(
  "/my/products/:id",
  requireAuthentication,
  permissionMiddleware(["user"]),
  validationMiddleware(updateproduct.requestSchema),
  updateproduct.businessLogic
);

router.delete(
  "/my/products/:id",
  requireAuthentication,
  permissionMiddleware(["user"]),
  validationMiddleware(delproduct.requestSchema),
  delproduct.businessLogic
);

export default router;
