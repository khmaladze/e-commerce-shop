import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

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
import { getSwaggerUiRouter } from "./documentation/open-api-documentation";
import config from "./swagger.config";
import { appConfig, isValidEnv } from "./app.config";

app.use("/api/auth", authRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/product", productRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/user", userRoute);

// Set security headers
app.use(helmet());
app.use(getSwaggerUiRouter(app, config));

if (!isValidEnv()) {
  app.listen(appConfig.PORT, () => {
    console.log(`Server is running on port ${appConfig.PORT}`);
  });
}
