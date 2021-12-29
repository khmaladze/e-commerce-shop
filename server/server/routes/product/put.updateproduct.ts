import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { min } from "lodash";
import db from "../../db/db";
import { products, shop } from "../../utils/response.schema.items";

const userEndpointDesc =
  "This is endpoint to update shop product you can update anything you want if you want update all the fields or just one. You can update how many you want. Tt's up to you";

export const TAGS = ["product"];

export const requestSchema = Joi.object({
  headers: Joi.object()
    .keys({
      "user-agent": Joi.string().required(),
      authorization: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  query: Joi.object(),
  body: Joi.object({
    title: Joi.string().min(0).max(50),
    productDescription: Joi.string().min(0).max(1000),
    price: Joi.string().min(0),
    productCount: Joi.string().min(0),
    productImage: Joi.string().min(0).max(500),
    requestedBy: Joi.string().valid("shop", "user").required(),
  }),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
  products: Joi.array().required(),
  shop: shop.required(),
  productList: products.required(),
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    let { title, productDescription, price, productCount, productImage } =
      req.body;
    let productId = req.params.id;
    console.log("productId", productId);
    let user_shop = await db("shop")
      .where({ shop_owner: req.user.user_id })
      .select("shop_id");
    let shop = user_shop[0];
    let products = (await db("product")
      .where({
        product_id: productId,
        posted_by_shop: shop.shop_id,
        is_blocked: false,
      })
      .select("*")) as Array<any>;
    let product = products[0];
    let updateProducts = await db("product")
      .where({
        product_id: productId,
        posted_by_shop: shop.shop_id,
        is_blocked: false,
      })
      .update({
        product_id: productId,
        title: title || product.title,
        product_description: productDescription || product.product_description,
        price: price || product.price,
        product_count: productCount || product.product_count,
        product_image: productImage || product.product_image,
      });
    let productList = await db("product")
      .where({
        posted_by_shop: shop.shop_id,
        is_blocked: false,
      })
      .select("*");
    res.send({
      success: true,
      products,
      shop,
      productList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
