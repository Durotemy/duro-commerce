import Order from "../models/OrderModel";
import express, { Request, Response } from "express";
declare module "express" { 
    export interface Request {
      user: any
      _id: any
    }
  }
  
  declare global {
    namespace Express {
      interface Request {
        user: any //or other type you would like to use
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
  if (orderItems && orderItems.length === 0) {
    res.status(400).json({msg: "No order items"});
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
};
