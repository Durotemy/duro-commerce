"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getProducts = void 0;
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield ProductModel_1.default.find();
        res.status(200).json(product);
        if (!product) {
            res.status(404).json({ msg: "no product not found" });
        }
        console.log("hello");
    }
    catch (error) {
        res.status(500).json({ msg: "something went wrong" });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield ProductModel_1.default.findById(req.params.id);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(404).json({ msg: "product not found" });
    }
});
exports.getProductById = getProductById;
// export default { getProduct, getProductById };
