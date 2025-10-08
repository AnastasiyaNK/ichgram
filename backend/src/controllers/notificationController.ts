import { Request, Response } from "express";
import Notification from "../models/notificationModel.js";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const notifications = await Notification.find({ recipient: userId })
      .populate("sender", "name profileImage")
      .populate("post", "image description")
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: "Not found" });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const markAllAsRead = async (req: Request, res: Response) => {
  try {
    const userId = req.user;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    await Notification.updateMany(
      { recipient: userId, read: false },
      { read: true }
    );

    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const createNotification = async ({
  recipient,
  sender,
  type,
  post,
}: {
  recipient: string;
  sender: string;
  type: "like" | "comment" | "follow";
  post?: string;
}) => {
  if (recipient === sender) return; 
  await Notification.create({ recipient, sender, type, post });
};
