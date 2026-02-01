import { Request, Response } from "express";
import User from "../models/user.model";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password"); // menampilkan semua data di document kecuali data password
    res.status(200).json({ message: "Get users successfully", data: users });
  } catch (error: any) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json({ message: "Get user successfully", data: user });
  } catch (error: any) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
