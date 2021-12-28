import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import db from "../../db/db";

const userEndpointDesc =
  "This is endpoint to  update shop product you can update anything you want if you want update all the fields or just one. you can update how many you want. it's up to you";
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
  body: Joi.object(),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
  products: Joi.array().required(),
  myShop: Joi.array().required(),
  updateProducts: Joi.array().required(),
  productList: Joi.array().required(),
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    let { title, productDescription, price, productCount, productImage } =
      req.body;
    let productId = req.params.id;
    console.log("productId", productId);
    let myShop = await db("shop")
      .where({ shop_owner: req.user.user_id })
      .select("shop_id");
    let products = (await db("product")
      .where({
        product_id: productId,
        posted_by_shop: myShop[0].shop_id,
        is_blocked: false,
      })
      .select("*")) as Array<any>;
    let product = products[0];
    let updateProducts = await db("product")
      .where({
        product_id: productId,
        posted_by_shop: myShop[0].shop_id,
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
        posted_by_shop: myShop[0].shop_id,
        is_blocked: false,
      })
      .select("*");
    res.send({
      success: true,
      products,
      myShop,
      updateProducts,
      productList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
