import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes";
import usersController from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes";

import connectDB from "./config/db";

const app = express();
dotenv.config();
connectDB();

// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", usersController);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get(`/api/config/paypal`, (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const dirname = path.resolve();
app.use("/upload", express.static(path.join(dirname, "/uploads")));

const port = process.env.PORT || 6000;
console.log(`my server is running on port: ${port}`);

module.exports = app;
