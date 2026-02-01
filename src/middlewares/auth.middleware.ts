import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
