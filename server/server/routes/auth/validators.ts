import Joi from "joi";

export const onlyGmail = Joi.string()
  .email({ minDomainSegments: 1, tlds: { allow: ["com"] } })
  .custom((value, helpers) => {
    if (value.indexOf("gmail") === -1) {
      return helpers.message({
        custom: "your email should registered only https://www.gmail.com",
      });
    }
    return value;
  });
