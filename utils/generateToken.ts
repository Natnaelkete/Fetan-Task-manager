import { Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const generateToken = (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "1d",
  });

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 86400000,
  });
};

export default generateToken;
