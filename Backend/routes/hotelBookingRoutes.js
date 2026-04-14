import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { miscReceiptSingle } from "../middleware/uploadTransportVisaReceipt.js";
import {
  createHotelBooking,
  listMyHotelBookings,
  setMyHotelPaymentMethod,
  attachHotelPaymentReceipt,
  dismissHotelBooking,
} from "../controllers/hotelBookingController.js";
import {
  createHotelStripePaymentIntent,
  confirmHotelStripePayment,
} from "../controllers/stripePaymentController.js";

const router = express.Router();

router.use(protect);
router.post("/bookings", createHotelBooking);
router.get("/bookings/me", listMyHotelBookings);
router.post(
  "/bookings/:id/stripe/payment-intent",
  createHotelStripePaymentIntent
);
router.post("/bookings/:id/stripe/confirm", confirmHotelStripePayment);
router.patch("/bookings/:id/payment-method", setMyHotelPaymentMethod);
router.post(
  "/bookings/:id/payment-receipt",
  miscReceiptSingle(),
  attachHotelPaymentReceipt
);
router.delete("/bookings/:id", dismissHotelBooking);

export default router;

