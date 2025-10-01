import { Request, Response } from "express";
import FollowModel from "../models/followModel.js";
import User from "../models/userModel.js";


// Follow
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

    // update counts
    await User.findByIdAndUpdate(follower, { $inc: { followingCount: 1 } });
    await User.findByIdAndUpdate(userId, { $inc: { followersCount: 1 } });

    res.json({ message: "Followed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Unfollow
export const unfollowUser = async (
  req: Request,
  res: Response
) => {
  try {
    const follower = req.user;
    const { userId } = req.body;

    if (!follower) return res.status(401).json({ message: "Unauthorized" });

    const follow = await FollowModel.findOne({ follower, following: userId });
    if (!follow) {
      return res.status(400).json({ message: "Not following" });
    }

    await follow.deleteOne();

    // update counts
    await User.findByIdAndUpdate(follower, { $inc: { followingCount: -1 } });
    await User.findByIdAndUpdate(userId, { $inc: { followersCount: -1 } });

    res.json({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
