import express, { Request, Response } from "express";
import Product from "../models/ProductModel";


export const getProducts = async (req: Request, res: Response) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
    if(!product){
        res.status(404).json({ msg: "no product not found" });
    }
   console.log("hello");
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
  }
};

export const getProductById = async (req:Request,res:Response) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ msg: "product not found" });
    }
};
// export default { getProduct, getProductById };
