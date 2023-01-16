import mongoose from "mongoose";
import Order from "../models/OrderModel";
import express, { Request, Response } from "express";
declare module "express" {
  export interface Request {
    user: any;
    _id: any;
  }
}

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export const addOrderItems = async (req: Request, res: Response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  try {
    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ msg: "No order items" });
      return;
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    console.log(error);
  }
};
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ msg: "Order not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateOrderToPaid = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findById({ user: req.user._id });
    // const user = await User.findById(req.user._id)
    console.log("orders", orders);
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};
