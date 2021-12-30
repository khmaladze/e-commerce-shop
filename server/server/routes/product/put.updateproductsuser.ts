import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import db from "../../db/db";
import { Shop } from "../../interfaces/custom";
import { product } from "../../utils/response.schema.items";

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
  products: Joi.array().items(product).required(),
  productList: Joi.array().items(product).required(),
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    let { title, productDescription, price, productCount, productImage } =
      req.body;

    let productId = req.params.id;
    let products = await db("product")
      .where({
        product_id: productId,
        posted_by_user: req.user.user_id,
        is_blocked: false,
      })
      .select("*");
    let productUpdating = {
      product_id: productId,
    } as any;
    if (title) {
      productUpdating.title = title;
    }
    if (productDescription) {
      productUpdating.product_description = productDescription;
    }
    if (price) {
      productUpdating.price = price;
    }
    if (productCount) {
      productUpdating.product_count = productCount;
    }
    if (productImage) {
      productUpdating.product_image = productImage;
    }
    let updateProducts = await db("product")
      .where({
        product_id: productId,
        posted_by_user: req.user.user_id,
        is_blocked: false,
      })
      .update(productUpdating);
    let productList = (await db("product")
      .where({
        posted_by_user: req.user.user_id,
        is_blocked: false,
      })
      .select("*")) as Array<Shop>;
    res.send({
      success: true,
      product: productList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// {
//         product_id: productId,
//         title: title || products[0].title,
//         product_description:
//           productDescription || products[0].product_description,
//         price: price || products[0].price,
//         product_count: productCount || products[0].product_count,
//         product_image: productImage || products[0].product_image,
//       }
