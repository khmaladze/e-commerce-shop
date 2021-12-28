import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import db from "../../db/db";

const userEndpointDesc =
  "This is endpoint to  update  product from individual user. you can update anything you want if you want update all the fields or just one. you can update how many you want. it's up to you";
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
  updateProducts: Joi.array().required(),
  productList: Joi.array().required(),
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    let { title, productDescription, price, productCount, productImage } =
      req.body;

    let productId = req.params.id;
    let validProductId = productId.substring(1, productId.length);
    let products = await db("product")
      .where({
        product_id: validProductId,
        posted_by_user: req.user.user_id,
        is_blocked: false,
      })
      .select("*");

    let updateProducts = await db("product")
      .where({
        product_id: validProductId,
        posted_by_user: req.user.user_id,
        is_blocked: false,
      })
      .update({
        product_id: validProductId,
        title: title || products[0].title,
        product_description:
          productDescription || products[0].product_description,
        price: price || products[0].price,
        product_count: productCount || products[0].product_count,
        product_image: productImage || products[0].product_image,
      });
    let productList = await db("product")
      .where({
        posted_by_user: req.user.user_id,
        is_blocked: false,
      })
      .select("*");
    res.send({
      success: true,
      products,
      updateProducts,
      productList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error",
      error: error,
    });
  }
};
