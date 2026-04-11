import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  listVisaOptions,
  createVisaRequest,
  listMyVisaRequests,
  setMyVisaPaymentMethod,
  attachVisaPaymentReceipt,
  dismissVisaRequest,
} from "../controllers/visaRequestController.js";
import {
  createVisaStripePaymentIntent,
  confirmVisaStripePayment,
} from "../controllers/stripePaymentController.js";
import { miscReceiptSingle } from "../middleware/uploadTransportVisaReceipt.js";

const router = express.Router();

router.get("/options", listVisaOptions);

router.use(protect);
router.post("/requests", createVisaRequest);
router.get("/requests/me", listMyVisaRequests);
router.post("/requests/:id/stripe/payment-intent", createVisaStripePaymentIntent);
router.post("/requests/:id/stripe/confirm", confirmVisaStripePayment);
router.patch("/requests/:id/payment-method", setMyVisaPaymentMethod);
router.post(
  "/requests/:id/payment-receipt",
  miscReceiptSingle(),
  attachVisaPaymentReceipt
);
router.delete("/requests/:id", dismissVisaRequest);

export default router;
