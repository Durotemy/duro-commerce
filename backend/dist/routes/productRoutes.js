"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller/productController");
const authmiddleware_1 = require("../middleware/authmiddleware");
const router = express_1.default.Router();
router.get('/', productController_1.getProducts);
router.get('/top', productController_1.getTopProducts);
router.get('/:id', productController_1.getProductById);
router.delete('/:id', authmiddleware_1.protect, authmiddleware_1.admin, productController_1.deleteProduct);
router.post('/', authmiddleware_1.protect, authmiddleware_1.admin, productController_1.createProduct);
router.put('/:id', authmiddleware_1.protect, authmiddleware_1.admin, productController_1.updateProduct);
exports.default = router;
