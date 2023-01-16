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
exports.getMyOrders = exports.updateOrderToPaid = exports.getOrderById = exports.addOrderItems = void 0;
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
        const order = yield OrderModel_1.default.findById(req.params.id);
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
const updateOrderToPaid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield OrderModel_1.default.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address,
            };
            const updatedOrder = yield order.save();
            res.json(updatedOrder);
        }
        else {
            res.status(404);
            throw new Error("Order not found");
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateOrderToPaid = updateOrderToPaid;
const getMyOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield OrderModel_1.default.findById({ user: req.user._id });
        // const user = await User.findById(req.user._id)
        console.log("orders", orders);
        res.json(orders);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getMyOrders = getMyOrders;
