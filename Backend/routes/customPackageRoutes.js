import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createCustomPackageRequest,
  listMyCustomPackageRequests,
  acceptApprovedCustomPackage,
} from "../controllers/customPackageController.js";

const router = express.Router();

router.use(protect);
router.post("/", createCustomPackageRequest);
router.get("/me", listMyCustomPackageRequests);
router.post("/:id/accept", acceptApprovedCustomPackage);

export default router;

