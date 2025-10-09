import { Request, Response } from "express";
import Post from "../models/postModels.js";

export const getRandomPosts = async (_req: Request, res: Response) => {
  try {
    const random = Math.random();

    // 1️⃣ шукаємо пости з randomValue >= random
    let posts = await Post.find({ randomValue: { $gte: random } })
      .limit(10)
      .populate("author", "name profileImage");

  
    if (posts.length < 10) {
      const extra = await Post.find({ randomValue: { $lt: random } })
        .limit(10 - posts.length)
        .populate("author", "name profileImage");
      posts = posts.concat(extra);
    }

    res.json(posts);
  } catch (error) {
    console.error("Explore error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
