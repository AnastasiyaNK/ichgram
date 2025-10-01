import { Request, Response } from "express";
import Comment from "../models/commentModel.js";
import Post from "../models/postModels.js";


export const addComment = async (req: Request, res: Response) => {
  try {
    const userId = req.user;
    const { postId, text } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = new Comment({ user: userId, post: postId, text });
    await comment.save();

    post.comments.push(comment._id);
    await post.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate(
      "user",
      "name profileImage"
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
