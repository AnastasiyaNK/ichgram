import { Request, Response } from "express";
import { Types } from "mongoose";
import Post, { IPost } from "../models/postModels.js";
import { createNotification } from "./notificationController.js"; // 🔔 нотифікації


export const toggleLike = async (req: Request, res: Response) => {
  try {
    const userId = req.user as string; 
    const { postId } = req.params;

    const post: IPost | null = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userObjectId = new Types.ObjectId(userId);

    const alreadyLiked = post.likes.some((id: Types.ObjectId) =>
      id.equals(userObjectId)
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id: Types.ObjectId) => !id.equals(userObjectId)
      );
    } else {
      post.likes.push(userObjectId);

     
      if (post.author.toString() !== userId) {
        await createNotification({
          recipient: post.author.toString(),
          sender: userId,
          type: "like",
          post: post._id.toString(),
        });
      }
    }

    await post.save();
    res.json(post);
  } catch (error) {
    console.error("toggleLike error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


export const getLikes = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.postId).populate(
      "likes",
      "name profileImage"
    );

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post.likes);
  } catch (error) {
    console.error("getLikes error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

