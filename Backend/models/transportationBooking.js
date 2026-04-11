import mongoose from "mongoose";

const transportationBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    statusReason: { type: String, default: "" },
    selectedOption: {
      optionId: { type: String, default: "" },
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      priceLabel: { type: String, default: "" },
      /** Total PKR due (per-passenger rate × passengers) */
      priceAmount: { type: Number, default: 0 },
      pricePerPassenger: { type: Number, default: 0 },
      passengerCount: { type: Number, default: 1 },
    },
    form: {
      serviceType: { type: String, default: "" },
      vehicleType: { type: String, default: "" },
      tripType: { type: String, default: "" },
      pickup: { type: String, default: "" },
      dropoff: { type: String, default: "" },
      pickupDate: { type: String, default: "" },
      pickupTime: { type: String, default: "" },
      passengers: { type: Number, default: 1 },
      extras: { type: mongoose.Schema.Types.Mixed, default: {} },
    },
    pickupAt: { type: Date },
    endAt: { type: Date },
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

transportationBookingSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("TransportationBooking", transportationBookingSchema);
