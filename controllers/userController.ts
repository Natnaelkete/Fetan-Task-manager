import { Request, Response } from "express";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    if (user) {
      generateToken(res, user._id.toString());

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.log("Signup error", error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.log("Signup error", error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("auth_token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Signup error", error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
