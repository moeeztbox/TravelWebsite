import express from "express";
import {
  submitReview,
  getApprovedReviews,
  adminListReviews,
  adminSetReviewStatus,
  adminDeleteReview,
} from "../controllers/reviewController.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", submitReview);
router.get("/approved", getApprovedReviews);

router.get("/admin/all", protectAdmin, adminListReviews);
router.patch("/admin/:id", protectAdmin, adminSetReviewStatus);
router.delete("/admin/:id", protectAdmin, adminDeleteReview);

export default router;
