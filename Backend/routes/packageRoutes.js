import express from "express";
import {
  getPackageBySlug,
  createPackage,
  updatePackage,
  deletePackage,
} from "../controllers/packageController.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/:packageId", getPackageBySlug);

router.post("/", protectAdmin, createPackage);
router.patch("/:packageId", protectAdmin, updatePackage);
router.delete("/:packageId", protectAdmin, deletePackage);

export default router;
