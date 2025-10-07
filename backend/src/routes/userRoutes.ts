import express from "express";
import { updateProfile, getProfile, getUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();


router.get("/profile/:id", authMiddleware, getProfile);
router.get("/profile/:userId", getUserProfile);
router.put(
  "/profile",
  authMiddleware,
  upload.single("profileImage"),
  updateProfile
);

export default router;
