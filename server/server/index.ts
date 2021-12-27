import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import Joi from "joi";

// Middleware
const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

import authRoutes from "./routes/auth/index";
import shopRoutes from "./routes/shop/index";
import productRoutes from "./routes/product/index";
import historyRoutes from "./routes/history/index";
import userRoute from "./routes/user/index";
import { getOpenApiSchemaRouter } from "./documentation/open-api-documentation";
import config from "./swagger.config";

app.use("/api/auth", authRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/product", productRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/user", userRoute);

// Set security headers
app.use(helmet());
app.use("/docs", express.static("server/documentation/swagger-ui-static"));
app.use(getOpenApiSchemaRouter(app, config));

export const appConfig = {
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE: process.env.DATABASE,
  PORT: process.env.PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
};

const appConfigSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  DATABASE: Joi.string().required(),
  PORT: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
});

const PORT: number = Number(process.env.PORT) || 5000;

const { error } = appConfigSchema.validate(appConfig, {
  abortEarly: false,
  convert: false,
});

if (!error) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} else {
  console.log("error please add .env file to run this program💻💻💻");
  console.log(error);
}
