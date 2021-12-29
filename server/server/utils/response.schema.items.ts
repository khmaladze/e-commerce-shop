import Joi from "joi";

export const updateProducts = Joi.array().items(
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
);
