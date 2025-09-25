import { Request, Response } from "express";
import User from "../models/userModel.js";



export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

interface AuthenticatedRequest extends Request {
  user?: string;
  file?: Express.Multer.File & { path?: string };
}

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { name, bio } = req.body;
    const updateData: { name?: string; bio?: string; profileImage?: string } =
      {};

    if (name) updateData.name = name;
    if (bio) updateData.bio = bio;

    if (req.file && req.file.path) {
      updateData.profileImage = req.file.path; // з Cloudinary прийде https://...
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
