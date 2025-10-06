import { Request, Response } from "express";
import Post from "../models/postModels";


export const getAllPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate("author", "name profileImage")
      .populate("comments")
      .populate("likes");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ author: id })
      .populate("author", "name profileImage") 
      .populate("likes");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const createPost = async (req: Request, res: Response) => {
  try {
    const userId = req.user;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { description } = req.body;
    const image = req.file?.path;

    const post = new Post({
      author: userId,
      description,
      image,
    });

    await post.save();

    const populatedPost = await Post.findById(post._id)
      .populate("author", "name profileImage")
      .populate("comments")
      .populate("likes");

    res.status(201).json(populatedPost); 
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name profileImage")
      .populate("comments")
      .populate("likes");

    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const updatePost = async (req: Request, res: Response) => {
  try {
    const userId = req.user;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { description, image } = req.body;
    if (description) post.description = description;
    if (image) post.image = image;

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const deletePost = async (req: Request, res: Response) => {
  try {
    const userId = req.user;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
