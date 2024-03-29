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
exports.getTopProducts = exports.createProductReview = exports.updateProduct = exports.createProduct = exports.deleteProduct = exports.getProductById = exports.getProducts = void 0;
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageSize = 8;
        const page = Number(req.query.pageNumber) || 1;
        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: "i",
                },
            }
            : {
                name: {
                    $regex: "",
                    $options: "i",
                },
            };
        const count = yield ProductModel_1.default.countDocuments(Object.assign({}, keyword));
        const product = yield ProductModel_1.default.find(Object.assign({}, keyword))
            .limit(pageSize)
            .skip(pageSize * (page - 1));
        res.status(200).json({ product, page, pages: Math.ceil(count / pageSize) });
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
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield ProductModel_1.default.findById(req.params.id);
    if (product) {
        yield product.remove();
        res.json({ message: "Product removed" });
    }
    else {
        res.status(404);
        throw new Error("Product not found");
    }
});
exports.deleteProduct = deleteProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new ProductModel_1.default({
        name: "Sample name",
        price: 0,
        user: req.user._id,
        image: "/images/sample.jpg",
        brand: "Sample brand",
        category: "Sample category",
        countInStock: 0,
        numReviews: 0,
        description: "Sample description",
    });
    console.log("gggg", product);
    const createdProduct = yield product.save();
    res.status(201).json(createdProduct);
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = yield ProductModel_1.default.findById(req.params.id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        const updatedProduct = yield product.save();
        res.json(updatedProduct);
    }
    else {
        res.status(404);
        throw new Error("Product not found");
    }
});
exports.updateProduct = updateProduct;
const createProductReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating, comment } = req.body;
    const product = yield ProductModel_1.default.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
        if (alreadyReviewed) {
            res.status(400);
            throw new Error("Product already reviewed");
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        yield product.save();
        res.status(201).json({ message: "Review added" });
    }
    else {
        res.status(404);
        throw new Error("Product not found");
    }
});
exports.createProductReview = createProductReview;
const getTopProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield ProductModel_1.default.find({}).sort({ rating: -1 }).limit(3);
    return res.json(products);
});
exports.getTopProducts = getTopProducts;
// export default { getProduct, getProductById };
