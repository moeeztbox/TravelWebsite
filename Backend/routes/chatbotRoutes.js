import express from "express";
import { chatWithBot } from "../controllers/chatbotController.js";

const router = express.Router();

// POST /api/chat
router.post("/chat", chatWithBot);

export default router;
