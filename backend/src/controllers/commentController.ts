import { Request, Response } from "express";
import Comment from "../models/commentModel.js";
import Post from "../models/postModels.js";
import { createNotification } from "./notificationController.js"; // 🔔 додаємо імпорт

export const addComment = async (req: Request, res: Response) => {
  try {
    const userId = req.user;
    const { postId, text } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = new Comment({ user: userId, post: postId, text });
    await comment.save();

    post.comments.push(comment._id);
    await post.save();

  
  if (String(post.author) !== String(userId)) {
    await createNotification({
      recipient: post.author.toString(), 
      sender: userId.toString(), 
      type: "comment",
      post: postId.toString(), 
    });
  }

    res.status(201).json(comment);
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("user", "name profileImage")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.error("Get comments error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
