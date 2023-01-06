import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";

interface JwtPayload {
  _id: string;
  id: string;
}
//   const { _id } = jwt.verify(token, 'thisisfromabhishek') as JwtPayload
//   req.user = await User.findOne({ _id, 'tokens.token': token })

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.user = await User.findOne({ id, "tokens.token": token });
        next();
      } catch (error) {
        res.status(404);
        throw new Error("not authorization token failde");
      }
    }
    if (!token) {
      res.status(404).send("unauthorized");
    }
  } catch (error) {
    res.send("error here");
    console.log(error);
  }
};
