import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import db from "../../db/db";
import { updateProducts } from "../../utils/response.schema.items";

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
  body: Joi.object(),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
  products: Joi.array().required(),
  shop: Joi.array()
    .items(
      Joi.object({
        shop_id: Joi.string().required(),
        shop_name: Joi.string().required(),
        shop_owner: Joi.string().required(),
        category: Joi.string().required(),
        is_blocked: false,
        budget: Joi.string().required(),
        shop_image: Joi.string().required(),
      })
    )
    .required(),
  updateProducts: updateProducts.required(),
  productList: Joi.array()
    .items(
      Joi.object({
        product_id: Joi.string().required(),
        title: Joi.string().required(),
        product_description: Joi.string().required(),
        product_image: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.string().required(),
        product_count: Joi.string().required(),
        posted_by_user: Joi.string(),
        posted_by_shop: Joi.string(),
        is_blocked: false,
      })
    )
    .required(),
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
