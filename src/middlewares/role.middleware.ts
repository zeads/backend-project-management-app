import { Request, Response, NextFunction } from "express";
// import { AuthRequest } from "../utils/types";

export const isAdmin = (
  // req: AuthRequest,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== "admin")
    return res.status(403).json({ msg: "Unauthorized" });
  next();
};
