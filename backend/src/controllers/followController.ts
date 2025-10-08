import { Request, Response } from "express";
import FollowModel from "../models/followModel.js";
import User from "../models/userModel.js";
import { createNotification } from "./notificationController.js"; // 🔔 додай цей імпорт


export const followUser = async (req: Request, res: Response) => {
  try {
    const follower = req.user;
    const { userId } = req.body;

    if (!follower) return res.status(401).json({ message: "Unauthorized" });
    if (String(follower) === String(userId)) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    const exists = await FollowModel.findOne({ follower, following: userId });
    if (exists) {
      return res.status(400).json({ message: "Already following" });
    }

    await FollowModel.create({ follower, following: userId });

    await User.findByIdAndUpdate(follower, { $inc: { followingCount: 1 } });
    await User.findByIdAndUpdate(userId, { $inc: { followersCount: 1 } });


    if (String(follower) !== String(userId)) {
      await createNotification({
        recipient: userId,
        sender: follower,
        type: "follow",
      });
    }

    res.json({ message: "Followed successfully" });
  } catch (error) {
    console.error("Follow error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


export const unfollowUser = async (req: Request, res: Response) => {
  try {
    const follower = req.user;
    const { userId } = req.body;

    if (!follower) return res.status(401).json({ message: "Unauthorized" });

    const follow = await FollowModel.findOne({ follower, following: userId });
    if (!follow) {
      return res.status(400).json({ message: "Not following" });
    }

    await follow.deleteOne();

    await User.findByIdAndUpdate(follower, { $inc: { followingCount: -1 } });
    await User.findByIdAndUpdate(userId, { $inc: { followersCount: -1 } });

    res.json({ message: "Unfollowed successfully" });
  } catch (error) {
    console.error("Unfollow error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


export const getFollowStatus = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user;
    const { userId } = req.params;

    if (!currentUser) return res.status(401).json({ message: "Unauthorized" });

    const isFollowing = !!(await FollowModel.findOne({
      follower: currentUser,
      following: userId,
    }));

    res.json({ isFollowing });
  } catch (error) {
    console.error("GetFollowStatus error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

