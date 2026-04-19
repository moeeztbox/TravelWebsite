import express from "express";
import { sendComplainEmail } from "../controllers/complainController.js";

const router = express.Router();

router.post("/", sendComplainEmail);

export default router;

