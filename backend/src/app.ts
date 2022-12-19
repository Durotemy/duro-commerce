import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes";
import usersController from "./routes/userRoutes";
import connectDB from "./config/db";

const app = express();
dotenv.config();
connectDB()

// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/users', usersController);



const port = process.env.PORT || 6000;
console.log(`my server is running on port: ${port}`);

module.exports = app;
