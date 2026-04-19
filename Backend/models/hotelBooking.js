import mongoose from "mongoose";

const hotelBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "cancelled"],
      default: "pending",
    },
    statusReason: { type: String, default: "" },

    hotel: {
      hotelId: { type: String, required: true, trim: true },
      name: { type: String, required: true, trim: true },
      address: { type: String, default: "" },
      city: { type: String, default: "" },
      country: { type: String, default: "" },
      image: { type: String, default: "" },
      starRating: { type: Number, default: 0 },
      rating: { type: Number, default: 0 },
      currency: { type: String, default: "USD" },
    },

    stay: {
      checkIn: { type: Date, required: true },
      checkOut: { type: Date, required: true },
      rooms: { type: Number, default: 1, min: 1 },
      adults: { type: Number, default: 2, min: 1 },
      children: { type: Number, default: 0, min: 0 },
    },

    /** Live search/rate quote saved when user submits booking (used as Stripe fallback if admin omits adminTotal) */
    quoteTotal: {
      amount: { type: Number, default: 0 },
      currency: { type: String, default: "USD" },
      label: { type: String, default: "Search quote" },
    },

    /** Set by admin when approving (optional); overrides quote for card charge when set */
    adminTotal: {
      amount: { type: Number, default: 0 },
      currency: { type: String, default: "USD" },
      label: { type: String, default: "" },
    },

    payment: {
      receiptPdf: { type: String, default: "" },
      stripePaymentIntentId: { type: String, default: "" },
      method: {
        type: String,
        enum: ["", "jazzcash", "easypaisa", "bank_transfer", "stripe"],
        default: "",
      },
      status: {
        type: String,
        enum: ["none", "verifying", "verified", "rejected"],
        default: "none",
      },
    },

    dismissedByUser: { type: Boolean, default: false },
  },
  { timestamps: true }
);

hotelBookingSchema.index({ user: 1, createdAt: -1 });
hotelBookingSchema.index({ "stay.checkOut": 1 });

export default mongoose.model("HotelBooking", hotelBookingSchema);

