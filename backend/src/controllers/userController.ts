
import { Request, Response } from "express";
import User from "../models/userModel.js";
import Post from "../models/postModels.js";

// export const getProfile = async (req: Request, res: Response) => {
//   try {
//     const userId = req.params.id;

//     const user = await User.findById(userId).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });

  
//     const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });

//     res.json({
//       _id: user._id,
//       name: user.name,
//       fullName: user.fullName,
//       bio: user.bio,
//       profileImage: user.profileImage,
//       followersCount: user.followersCount,
//       followingCount: user.followingCount,
//       postsCount: posts.length,
//       posts,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { name, bio } = req.body;
    const updateData: { name?: string; bio?: string; profileImage?: string } =
      {};

    if (name) updateData.name = name;
    if (bio) updateData.bio = bio;

    if (req.file && req.file.path) {
      updateData.profileImage = req.file.path; // URL з Cloudinary
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

      if (!user) return res.status(404).json({ message: "User not found" });
       

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log("Getting public profile for user ID:", userId);

    const user = await User.findById(userId)
      .select("-password -email") 
      .lean();

    if (!user) {
      console.log("User not found with ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Found user:", user.name);
    res.json(user);
  } catch (error) {
     res.status(500).json({ message: "Server error", error });
  }
};

