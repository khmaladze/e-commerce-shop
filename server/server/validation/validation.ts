import Joi from "joi";

// validate auth
export const authSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[a-z]+$/)
    .lowercase()
    .min(2)
    .max(50)
    .trim()
    .required(),
  lastName: Joi.string()
    .pattern(/^[a-z]+$/)
    .lowercase()
    .min(2)
    .max(100)
    .trim()
    .required(),
  birthDate: Joi.string().isoDate().required(),
  country: Joi.string().lowercase().min(2).max(50).trim().required(),
  userAddress: Joi.string().lowercase().min(2).max(50).trim().required(),
  email: Joi.string()
    .email({ minDomainSegments: 1, tlds: { allow: ["com"] } })
    .lowercase()
    .min(2)
    .max(50)
    .trim()
    .required(),
  userPassword: Joi.string().lowercase().min(2).max(30).trim().required(),
  userCard: Joi.string().lowercase().length(10).trim().required(),
  cardPassword: Joi.string().length(4).required(),
  budget: Joi.string().lowercase().min(2).max(50).trim().required(),
  confirmPassword: Joi.any().valid(Joi.ref("userPassword")).required(),
});

// check if email is valid
export function isValidEmail(email: string) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email.toLowerCase()
  );
}

// check if email clients are gmail or yahoo
export function isValidGmailProvider(email: string) {
  return /.+@(gmail)\.com$/.test(email.toLowerCase());
}

// validate product
export const productSchema = Joi.object({
  title: Joi.string().min(2).max(50).trim().required(),
  productDescription: Joi.string().max(50),
  category: Joi.number().required(),
  price: Joi.number().required(),
  productCount: Joi.number().required(),
  productImage: Joi.string().max(500).required(),
  requestedBy: Joi.string().max(500).required(),
});

// validate shop
export const shopSchema = Joi.object({
  shopName: Joi.string().max(50).required(),
  category: Joi.number().required(),
  budget: Joi.string().required(),
  shopImage: Joi.string().required(),
});

// valid update user
export const updateUserSchema = Joi.object({
  country: Joi.string().lowercase().min(2).max(50).trim().required(),
  userAddress: Joi.string().lowercase().min(2).max(50).trim().required(),
  userPassword: Joi.string().lowercase().min(2).max(30).trim().required(),
  confirmPassword: Joi.any().valid(Joi.ref("userPassword")).required(),
});
