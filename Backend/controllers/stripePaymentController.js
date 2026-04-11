import Stripe from "stripe";
import Booking from "../models/booking.js";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key);
}

/** Parse strings like "PKR 250,000" or "250000" into Stripe amount in smallest PKR unit (paisa). */
export function parsePkrToPaisa(packagePrice) {
  const s = String(packagePrice || "");
  const cleaned = s.replace(/[^\d.]/g, "");
  if (!cleaned) return null;
  const num = parseFloat(cleaned);
  if (!Number.isFinite(num) || num <= 0) return null;
  return Math.round(num * 100);
}

export const createBookingPaymentIntent = async (req, res) => {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return res.status(503).json({
        message:
          "Stripe is not configured. Add STRIPE_SECRET_KEY to Backend/.env.",
      });
    }

    const userId = req.user._id ?? req.user.id;
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: userId,
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (booking.status !== "approved") {
      return res.status(400).json({
        message: "Payment is only available after the booking is approved.",
      });
    }
    if (booking.payment?.status === "verified") {
      return res.status(400).json({ message: "This booking is already paid." });
    }

    const amount = parsePkrToPaisa(booking.packagePrice);
    if (!amount || amount < 100) {
      return res.status(400).json({
        message:
          "Could not read a valid PKR price for this booking. Contact support.",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "pkr",
      automatic_payment_methods: { enabled: true },
      metadata: {
        bookingId: String(booking._id),
        userId: String(userId),
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("createBookingPaymentIntent:", error);
    res.status(500).json({
      message: error.message || "Could not start card payment",
    });
  }
};

export const confirmBookingStripePayment = async (req, res) => {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return res.status(503).json({
        message: "Stripe is not configured.",
      });
    }

    const { paymentIntentId } = req.body || {};
    if (!paymentIntentId || typeof paymentIntentId !== "string") {
      return res.status(400).json({ message: "paymentIntentId is required" });
    }

    const userId = req.user._id ?? req.user.id;
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: userId,
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (pi.metadata?.bookingId !== String(booking._id)) {
      return res
        .status(400)
        .json({ message: "Payment does not match this booking." });
    }
    if (pi.status !== "succeeded") {
      return res.status(400).json({
        message:
          "Payment is not completed. Finish the card flow or try again.",
      });
    }

    booking.payment = {
      ...(booking.payment?.toObject
        ? booking.payment.toObject()
        : booking.payment || {}),
      method: "stripe",
      status: "verifying",
      stripePaymentIntentId: pi.id,
    };
    await booking.save();

    res.json({ booking });
  } catch (error) {
    console.error("confirmBookingStripePayment:", error);
    res.status(500).json({
      message: error.message || "Could not confirm payment",
    });
  }
};
