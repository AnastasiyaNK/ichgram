import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  followUser,
  unfollowUser,
} from "../controllers/followController.js";

const router = express.Router();
router.post("/follow", authMiddleware, followUser);
router.post("/unfollow", authMiddleware, unfollowUser);

export default router;
