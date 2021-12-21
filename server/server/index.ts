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

// Routes
app.get("/:text", (req, res) => {
  res.send(
    "<div style='height:500px;width:100%;background:green;color:blue;display:flex;text-align:center;align-items:center;justify-content:center;' ><h1>" +
      `${req.params.text}` +
      "</h1></div>"
  );
});

import "./models/user";
// import userRoutes from "./routes/auth";

import authRoutes from "./routes/auth";
app.use("/api/auth", authRoutes);
// app.use("/user", userRoutes);
// import "./database/database";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
