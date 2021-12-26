import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

// Middleware
const app: Application = express();
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

app.use("/api/authRoute", authRoutes);
app.use("/api/shopRoute", shopRoutes);
app.use("/api/productRoute", productRoutes);
app.use("/api/historyRoute", historyRoutes);
app.use("/api/userRoute", userRoute);

// Set security headers
app.use(helmet());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
