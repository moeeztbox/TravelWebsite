import express from "express";
import { protectAdmin } from "../middleware/adminMiddleware.js";
import {
  adminListCustomPackageRequests,
  adminUpdateCustomPackageRequest,
} from "../controllers/adminCustomPackageController.js";

const router = express.Router();

router.use(protectAdmin);
router.get("/", adminListCustomPackageRequests);
router.patch("/:id", adminUpdateCustomPackageRequest);

export default router;

