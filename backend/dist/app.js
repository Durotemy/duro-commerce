"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const orderRoutes_js_1 = __importDefault(require("./routes/orderRoutes.js"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, db_1.default)();
// view engine setup
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.json()); // for parsing application/json
app.use(body_parser_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use((0, cors_1.default)());
app.use("/api/products", productRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use("/api/orders", orderRoutes_js_1.default);
app.use("/api/upload", uploadRoutes_1.default);
app.get(`/api/config/paypal`, (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));
const dirname = path_1.default.resolve();
app.use("/upload", express_1.default.static(path_1.default.join(dirname, "/uploads")));
const port = process.env.PORT || 6000;
console.log(`my server is running on port: ${port}`);
module.exports = app;
