import express from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../controllers/notificationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getNotifications);
router.put("/:id/read", authMiddleware, markAsRead);
router.put("/mark-all-read", authMiddleware, markAllAsRead);

export default router;
