import Stripe from "stripe";
import Booking from "../models/booking.js";
import TransportationBooking from "../models/transportationBooking.js";
import VisaRequest from "../models/visaRequest.js";

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

function pkrTotalToPaisa(totalPkr) {
  const n = Number(totalPkr);
  if (!Number.isFinite(n) || n < 1) return null;
  return Math.round(n * 100);
}

export const createTransportStripePaymentIntent = async (req, res) => {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return res.status(503).json({
        message:
          "Stripe is not configured. Add STRIPE_SECRET_KEY to Backend/.env.",
      });
    }

    const userId = req.user._id ?? req.user.id;
    const booking = await TransportationBooking.findOne({
      _id: req.params.id,
      user: userId,
    });
    if (!booking) {
      return res.status(404).json({ message: "Transportation booking not found" });
    }
    if (booking.status !== "approved") {
      return res.status(400).json({
        message: "Payment is only available after approval.",
      });
    }
    if (booking.payment?.status === "verified") {
      return res.status(400).json({ message: "Already paid." });
    }

    const totalPkr = Number(booking.selectedOption?.priceAmount) || 0;
    const amount = pkrTotalToPaisa(totalPkr);
    if (!amount || amount < 100) {
      return res.status(400).json({
        message: "Invalid total amount for payment.",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "pkr",
      automatic_payment_methods: { enabled: true },
      metadata: {
        transportBookingId: String(booking._id),
        userId: String(userId),
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("createTransportStripePaymentIntent:", error);
    res.status(500).json({
      message: error.message || "Could not start card payment",
    });
  }
};

export const confirmTransportStripePayment = async (req, res) => {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return res.status(503).json({ message: "Stripe is not configured." });
    }

    const { paymentIntentId } = req.body || {};
    if (!paymentIntentId || typeof paymentIntentId !== "string") {
      return res.status(400).json({ message: "paymentIntentId is required" });
    }

    const userId = req.user._id ?? req.user.id;
    const booking = await TransportationBooking.findOne({
      _id: req.params.id,
      user: userId,
    });
    if (!booking) {
      return res.status(404).json({ message: "Transportation booking not found" });
    }

    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (pi.metadata?.transportBookingId !== String(booking._id)) {
      return res.status(400).json({ message: "Payment does not match this booking." });
    }
    if (pi.status !== "succeeded") {
      return res.status(400).json({
        message: "Payment is not completed. Finish the card flow or try again.",
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
    console.error("confirmTransportStripePayment:", error);
    res.status(500).json({
      message: error.message || "Could not confirm payment",
    });
  }
};

export const createVisaStripePaymentIntent = async (req, res) => {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return res.status(503).json({
        message:
          "Stripe is not configured. Add STRIPE_SECRET_KEY to Backend/.env.",
      });
    }

    const userId = req.user._id ?? req.user.id;
    const doc = await VisaRequest.findOne({
      _id: req.params.id,
      user: userId,
    });
    if (!doc) {
      return res.status(404).json({ message: "Visa request not found" });
    }
    if (doc.status !== "approved") {
      return res.status(400).json({
        message: "Payment is only available after approval.",
      });
    }
    if (doc.payment?.status === "verified") {
      return res.status(400).json({ message: "Already paid." });
    }

    const totalUsd = Number(doc.selectedOption?.priceAmount) || 0;
    const cents = Math.round(totalUsd * 100);
    if (!Number.isFinite(cents) || cents < 50) {
      return res.status(400).json({
        message: "Invalid total amount for payment.",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: cents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        visaRequestId: String(doc._id),
        userId: String(userId),
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("createVisaStripePaymentIntent:", error);
    res.status(500).json({
      message: error.message || "Could not start card payment",
    });
  }
};

export const confirmVisaStripePayment = async (req, res) => {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return res.status(503).json({ message: "Stripe is not configured." });
    }

    const { paymentIntentId } = req.body || {};
    if (!paymentIntentId || typeof paymentIntentId !== "string") {
      return res.status(400).json({ message: "paymentIntentId is required" });
    }

    const userId = req.user._id ?? req.user.id;
    const doc = await VisaRequest.findOne({
      _id: req.params.id,
      user: userId,
    });
    if (!doc) {
      return res.status(404).json({ message: "Visa request not found" });
    }

    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (pi.metadata?.visaRequestId !== String(doc._id)) {
      return res.status(400).json({ message: "Payment does not match this request." });
    }
    if (pi.status !== "succeeded") {
      return res.status(400).json({
        message: "Payment is not completed. Finish the card flow or try again.",
      });
    }

    doc.payment = {
      ...(doc.payment?.toObject ? doc.payment.toObject() : doc.payment || {}),
      method: "stripe",
      status: "verifying",
      stripePaymentIntentId: pi.id,
    };
    await doc.save();

    res.json({ visaRequest: doc });
  } catch (error) {
    console.error("confirmVisaStripePayment:", error);
    res.status(500).json({
      message: error.message || "Could not confirm payment",
    });
  }
};
