import mongoose from "mongoose";

const visaOptionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    priceLabel: { type: String, default: "" },
    priceAmount: { type: Number, default: 0 },
    tier: { type: String, enum: ["standard", "premium"], default: "standard" },
    visaTypes: [{ type: String, trim: true }],
    /** If non-empty, match when user's nationality is in this list (case-insensitive) */
    nationalities: [{ type: String, trim: true }],
    /** If set, match when duration days is within this inclusive range */
    durationMinDays: { type: Number },
    durationMaxDays: { type: Number },
    /** Match Massar registration requirement */
    massar: {
      type: String,
      enum: ["any", "with", "without"],
      default: "any",
    },
    /** Match passenger type requirement (adult/child/infant) */
    passengerType: {
      type: String,
      enum: ["any", "adult", "child", "infant"],
      default: "any",
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("VisaOption", visaOptionSchema);
