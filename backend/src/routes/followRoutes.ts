import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  followUser,
  getFollowStatus,
  unfollowUser,
} from "../controllers/followController.js";

const router = express.Router();
router.post("/", authMiddleware, followUser);
router.post("/unfollow", authMiddleware, unfollowUser);
router.get("/status/:userId", authMiddleware, getFollowStatus);

export default router;
