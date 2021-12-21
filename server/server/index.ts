import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

// Middleware
const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

import authRoutes from "./routes/auth";
import shopRoutes from "./routes/shop";

app.use("/api/auth", authRoutes);
app.use("/api/shop", shopRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
