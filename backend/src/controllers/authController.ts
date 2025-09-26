import { Request, Response } from "express";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateJWT.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, fullName } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { name }] });
    if (existingUser) return res.status(400).json({ message: "User exists" });

    const user = new User({ name, email, password, fullName });
    await user.save();

    const token = generateToken(user._id.toHexString());

    // Ставимо токен у httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // ⚠️ true у продакшені (HTTPS)
      sameSite: "lax", // або "none" якщо фронт і бек на різних доменах
      maxAge: 1000 * 60 * 60 * 24, // 1 день
    });

    res.status(201).json({
      user: { id: user._id.toHexString(), name, email, fullName },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id.toHexString());

    // Ставимо токен у httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.json({
      user: {
        id: user._id.toHexString(),
        name: user.name,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
