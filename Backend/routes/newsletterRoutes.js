import express from "express";
import {
  newsletterStatus,
  subscribeNewsletter,
  unsubscribeNewsletter,
} from "../controllers/newsletterController.js";

const router = express.Router();

router.get("/status", newsletterStatus);
router.post("/subscribe", subscribeNewsletter);
router.post("/unsubscribe", unsubscribeNewsletter);

export default router;

