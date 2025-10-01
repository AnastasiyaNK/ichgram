import expresss from 'express'
import authMiddleware from '../middleware/authMiddleware'
import { toggleLike, getLikes } from "../controllers/likeController.js";


const router = expresss.Router()

router.post("/:postId/like", authMiddleware, toggleLike);
router.get("/:postId", getLikes);

export default router