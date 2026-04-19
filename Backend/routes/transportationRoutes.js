import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  listTransportationOptions,
  createTransportationBooking,
  listMyTransportationBookings,
  setMyTransportPaymentMethod,
  attachTransportPaymentReceipt,
  dismissTransportationBooking,
} from "../controllers/transportationController.js";
import {
  createTransportStripePaymentIntent,
  confirmTransportStripePayment,
} from "../controllers/stripePaymentController.js";
import { miscReceiptSingle } from "../middleware/uploadTransportVisaReceipt.js";

const router = express.Router();

router.get("/options", listTransportationOptions);

router.use(protect);
router.post("/bookings", createTransportationBooking);
router.get("/bookings/me", listMyTransportationBookings);
router.post(
  "/bookings/:id/stripe/payment-intent",
  createTransportStripePaymentIntent
);
router.post("/bookings/:id/stripe/confirm", confirmTransportStripePayment);
router.patch("/bookings/:id/payment-method", setMyTransportPaymentMethod);
router.post(
  "/bookings/:id/payment-receipt",
  miscReceiptSingle(),
  attachTransportPaymentReceipt
);
router.delete("/bookings/:id", dismissTransportationBooking);

export default router;
