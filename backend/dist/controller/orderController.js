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
exports.getOrderById = exports.addOrderItems = void 0;
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const addOrderItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
    try {
        if (orderItems && orderItems.length === 0) {
            res.status(400).json({ msg: "No order items" });
            return;
        }
        else {
            const order = new OrderModel_1.default({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            });
            const createdOrder = yield order.save();
            res.status(201).json(createdOrder);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.addOrderItems = addOrderItems;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield OrderModel_1.default.findById(req.params.id).populate('user', 'name email');
        if (order) {
            res.json(order);
        }
        else {
            res.status(404).json({ msg: "Order not found" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getOrderById = getOrderById;
