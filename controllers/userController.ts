import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.json({ name: user?.name, email: user?.email });
  } catch (error) {
    console.log("get profile error", error);
    next();
  }
};
