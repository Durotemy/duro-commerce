"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controller/orderController");
const authmiddleware_1 = require("../middleware/authmiddleware");
const router = express_1.default.Router();
router.post('/', authmiddleware_1.protect, orderController_1.addOrderItems);
exports.default = router;
