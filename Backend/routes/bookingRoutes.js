import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createDraftBooking,
  listMyBookings,
  getBookingById,
  deleteMyBooking,
  setMyPaymentMethod,
} from "../controllers/bookingController.js";
import { attachDocuments } from "../controllers/bookingDocumentsController.js";
import {
  bookingUploadFields,
  bookingPaymentReceiptField,
} from "../middleware/uploadBookingDocs.js";
import { attachPaymentReceipt } from "../controllers/bookingDocumentsController.js";

const router = express.Router();

router.use(protect);

router.post("/", createDraftBooking);
router.get("/", listMyBookings);
router.get("/:id", getBookingById);
router.delete("/:id", deleteMyBooking);
router.patch("/:id/payment-method", setMyPaymentMethod);
router.post(
  "/:id/documents",
  bookingUploadFields(),
  attachDocuments
);
router.post(
  "/:id/payment-receipt",
  bookingPaymentReceiptField(),
  attachPaymentReceipt
);

export default router;
