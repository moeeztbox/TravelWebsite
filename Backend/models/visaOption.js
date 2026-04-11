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
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("VisaOption", visaOptionSchema);
