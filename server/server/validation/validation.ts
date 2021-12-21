import Joi from "joi";

const authSchema = Joi.object({
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
  //   isBlocked: Joi.boolean().required(),
  budget: Joi.string().lowercase().min(2).max(50).trim().required(),
  confirmPassword: Joi.any().valid(Joi.ref("userPassword")).required(),
  //   ipAddress: Joi.string().required(),
  //   browserType: Joi.string().required(),
  //   userOs: Joi.string().required(),
  //   userOsRelease: Joi.string().required(),
  //   userOsPlatform: Joi.string().required(),
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

export default authSchema;
