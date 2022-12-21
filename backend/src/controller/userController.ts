import express, { Request, Response } from "express";
import User from "../models/UserModel";
import {generateToken} from "../utils/generateToken";
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


export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  const user = await User.find({ email });
  
  
  if(user && (await user[0].matchPassword(password))){
    res.status(200).json({
      _id: user[0]._id,
      name: user[0].name,
      email: user[0].email,
      isAdmin: user[0].isAdmin,
      token: generateToken(user[0]._id),
    })
  }
 
 
    else {
    res.status(401).json({ msg: "invalid email or password" });
    }
   
  }
;

export const registerUser = async (req: Request, res: Response) => {
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

export const getUserProfile = async (req:Request, res:Response) => {
  const user = await User.findById(req.user._id)
  console.log("myUser",user)

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404).json({msg:'User not found'})
  }
}
