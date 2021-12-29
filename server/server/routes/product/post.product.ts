import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import db from "../../db/db";

const userEndpointDesc =
  "This is endpoint to add product you need to add all the fields like title, product_description, category, price, product_count, product_image (NOTE: for product image you can use images from min 1 to max 3 )";
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
    title: Joi.string().min(2).max(50).trim().required(),
    productDescription: Joi.string().max(1000),
    category: Joi.number().required(),
    price: Joi.number().required(),
    productCount: Joi.number().required(),
    productImage: Joi.string().max(500).required(),
    requestedBy: Joi.string().valid("user", "shop").required(),
  }),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    const {
      title,
      productDescription,
      category,
      price,
      productCount,
      productImage,
    } = req.body;
    type requestedByType = "user" | "shop";
    let requestedBy: requestedByType = req.body.requestedBy;
    let postedById;
    if (requestedBy == "user") {
      postedById = req.user.user_id;
    } else {
      let shopId = await db("shop")
        .where({
          shop_owner: req.user.user_id,
        })
        .select("shop_id");
      postedById = shopId[0].shop_id;
    }
    if (requestedBy == "user") {
      let productData = await db("product").insert({
        title: title,
        product_description: productDescription,
        category: category,
        price: price,
        product_count: productCount,
        is_blocked: false,
        product_image: productImage,
        posted_by_user: postedById,
      });
    } else {
      let productData = await db("product").insert({
        title: title,
        product_description: productDescription,
        category: category,
        price: price,
        product_count: productCount,
        is_blocked: false,
        product_image: productImage,
        posted_by_shop: postedById,
      });
    }
    res.send({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
