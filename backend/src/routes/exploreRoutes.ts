import express from "express";
import { getRandomPosts } from "../controllers/exploreController.js";

const router = express.Router();

router.get("/", getRandomPosts);

export default router;
