import express, { Request, Response } from "express";
import User from "../models/UserModel";

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user: any = await User.findOne({ email });
  if (user) {
    res.status(400).json({ msg: "user already exist" });
  }
  const newUser = await new User({
    name,
    email,
    password,
  });
        const result = newUser.save();
        res.status(200).json({ msg: "user created successfully", result });
        console.log(result);
  
};
export default registerUser;
