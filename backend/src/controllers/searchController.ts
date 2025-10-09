import { Request, Response } from "express";
import User from "../models/userModel.js";

export const searchUsers = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string" || q.trim() === "") {
      return res
        .status(400)
        .json({ message: "Query parameter 'q' is required" });
    }

    const users = await User.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { fullName: { $regex: q, $options: "i" } },
      ],
    })
      .select("name fullName profileImage bio followersCount followingCount")
      .limit(20);

    res.json(users);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
