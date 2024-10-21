import express from "express";
import { likePost } from "../controllers/updateLikePost.js"; // Ensure this points to the correct controller file

const router = express.Router();

// Define the like route
router.put('/:id/like', likePost);

export default router;
