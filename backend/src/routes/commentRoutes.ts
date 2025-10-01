import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addComment, getComments } from "../controllers/commentController.js";


const router = express.Router();

router.post("/", authMiddleware, addComment)
router.get("/:postId", getComments)

export default router