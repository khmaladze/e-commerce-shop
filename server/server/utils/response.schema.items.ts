import Joi from "joi";

export const product = Joi.array().items(
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
    is_blocked: Joi.boolean().required(),
  })
);

export const shops = Joi.array().items(
  Joi.object({
    shop_id: Joi.string().required(),
    shop_name: Joi.string().required(),
    shop_owner: Joi.string().required(),
    category: Joi.string().required(),
    is_blocked: Joi.boolean().required(),
    budget: Joi.string().required(),
    shop_image: Joi.string().required(),
  })
);

export const shop = Joi.object({
  shop_id: Joi.string().required(),
  shop_name: Joi.string().required(),
  shop_owner: Joi.string().required(),
  category: Joi.string().required(),
  is_blocked: Joi.boolean().required(),
  budget: Joi.string().required(),
  shop_image: Joi.string().required(),
});

export const user = Joi.object({
  user_id: Joi.string().required(),
  first_name: Joi.string().required(),
  birth_date: Joi.date().required(),
  country: Joi.string().required(),
  user_address: Joi.string().required(),
  email: Joi.string().required(),
  user_password: Joi.string().required(),
  user_card: Joi.string().required(),
  card_password: Joi.string().required(),
  is_blocked: Joi.boolean().required(),
  budget: Joi.string().required(),
  user_image: Joi.string(),
  ip_address: Joi.string().required(),
  browser_type: Joi.string().required(),
  created_at: Joi.string().required(),
  updated_at: Joi.string().required(),
});

export const products = Joi.array().items(
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
