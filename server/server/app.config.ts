import Joi from "joi";

export const appConfig = {
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  DATABASE: process.env.DATABASE ?? "",
  PORT: process.env.PORT ?? "",
  DB_USER: process.env.DB_USER ?? "",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "",
};

const appConfigSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  DATABASE: Joi.string().required(),
  PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
});

const { error } = appConfigSchema.validate(appConfig, {
  abortEarly: false,
});
if (error) {
  console.log("error please add .env file to run this program💻💻💻");
  console.log(JSON.stringify(error, null, 2));
}
export const isValidEnv = () => !!error;
