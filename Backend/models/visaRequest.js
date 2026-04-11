import mongoose from "mongoose";

const visaRequestSchema = new mongoose.Schema(
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
      priceAmount: { type: Number, default: 0 },
      tier: { type: String, default: "" },
    },
    form: {
      visaType: { type: String, default: "" },
      nationality: { type: String, default: "" },
      duration: { type: String, default: "" },
      adults: { type: Number, default: 0 },
      children: { type: Number, default: 0 },
      infants: { type: Number, default: 0 },
      massar: { type: String, default: "" },
    },
    /** Total travellers for display */
    membersCount: { type: Number, default: 0 },
    /** End of processing window — after this + verified payment, user may dismiss */
    serviceEndDate: { type: Date },
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

visaRequestSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("VisaRequest", visaRequestSchema);
