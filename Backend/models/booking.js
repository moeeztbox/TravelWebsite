import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    packageId: {
      type: String,
      required: true,
      trim: true,
    },
    packageTitle: { type: String, required: true, trim: true },
    packageSubtitle: { type: String, default: "" },
    packagePrice: { type: String, default: "" },
    packageDuration: { type: String, default: "" },
    packageImage: { type: String, default: "" },
    badge: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    statusReason: {
      type: String,
      enum: ["", "admin_rejected", "payment_failed"],
      default: "",
    },
    documents: {
      visaPdf: { type: String, default: "" },
      otherPdf: { type: String, default: "" },
    },
    payment: {
      receiptPdf: { type: String, default: "" },
      status: {
        type: String,
        enum: ["none", "verifying", "verified", "rejected"],
        default: "none",
      },
    },
    journey: {
      startAt: { type: Date },
      stage: {
        type: String,
        enum: [
          "not_started",
          "scheduled",
          "flight_takeoff",
          "in_makkah",
          "in_madinah",
          "return_flight",
          "completed",
        ],
        default: "not_started",
      },
      updatedAt: { type: Date },
    },
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1, packageId: 1, status: 1 });

export default mongoose.model("Booking", bookingSchema);
