import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import db from "../../db/db";

const userEndpointDesc =
  "This is how to add swagger description for this endpoint";

export const requestSchema = Joi.object({
  headers: Joi.object()
    .keys({
      "user-agent": Joi.string().required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object(),
  query: Joi.object(),
  body: Joi.object(),
}).description(userEndpointDesc);

export const responseSchema = Joi.object({
  success: Joi.boolean().required(),
});

export const businessLogic = async (req: Request | any, res: Response) => {
  try {
    let { title, productDescription, price, productCount, productImage } =
      req.body;

    let productId = req.params.id;
    let validProductId = productId.substring(1, productId.length);
    let products = await db("product")
      .where({
        product_id: validProductId,
        posted_by_user: req.user[0].user_id,
        is_blocked: false,
      })
      .select("*");

    let updateProducts = await db("product")
      .where({
        product_id: validProductId,
        posted_by_user: req.user[0].user_id,
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
        posted_by_user: req.user[0].user_id,
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
