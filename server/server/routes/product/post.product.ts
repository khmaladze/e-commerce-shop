import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import db from "../../db/db";

const userEndpointDesc =
  "This is how to add swagger description for this endpoint";
export const TAGS = ["product"];

export const requestSchema = Joi.object({
  headers: Joi.object()
    .keys({
      "user-agent": Joi.string().required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object(),
  query: Joi.object(),
  body: Joi.object({
    title: Joi.string().min(2).max(50).trim().required(),
    productDescription: Joi.string().max(1000),
    category: Joi.number().required(),
    price: Joi.number().required(),
    productCount: Joi.number().required(),
    productImage: Joi.string().max(500).required(),
    requestedBy: Joi.string().max(500).required(),
  }),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
});

export const businessLogic = async (req: Request | any, res: Response) => {
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
      postedById = req.user[0].user_id;
    } else {
      let shopId = await db("shop")
        .where({
          shop_owner: req.user[0].user_id,
        })
        .select("shop_id");
      console.log(shopId);
      console.log(shopId[0].shop_id);
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
      message: "Error",
      error: error,
    });
  }
};
