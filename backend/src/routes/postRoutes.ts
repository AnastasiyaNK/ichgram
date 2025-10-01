import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getAllPosts,
  getUserPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import upload from "../middleware/multer.js";


const router = express.Router();

router.get("/", getAllPosts);

router.get("/user/:id", getUserPosts);

router.post("/", authMiddleware, upload.single("image"), createPost);

router.get("/:id", getPostById);

router.put("/:id", authMiddleware, updatePost);

router.delete("/:id", authMiddleware, deletePost);

export default router;
