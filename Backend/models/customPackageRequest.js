import mongoose from "mongoose";

const moneySchema = new mongoose.Schema(
  {
    currency: { type: String, default: "PKR", trim: true },
    amount: { type: Number, default: 0, min: 0 },
  },
  { _id: false }
);

const estimateSchema = new mongoose.Schema(
  {
    base: { type: Number, default: 0, min: 0 },
    hotelMultiplier: { type: Number, default: 1, min: 0 },
    passengers: { type: Number, default: 1, min: 1 },
    total: { type: Number, default: 0, min: 0 },
  },
  { _id: false }
);

const customPackageRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    // Snapshot fields (useful if user later updates profile)
    fullName: { type: String, required: true, trim: true },
    city: { type: String, default: "", trim: true },
    phone: { type: String, default: "", trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },

    passengers: { type: Number, required: true, min: 1 },
    startDate: { type: Date, required: true },
    hotelCategory: { type: Number, required: true, enum: [2, 3, 4, 5] },
    packageType: {
      type: String,
      enum: ["group", "customize"],
      default: "customize",
    },
    notes: { type: String, default: "", trim: true },

    estimate: { type: estimateSchema, default: () => ({}) },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
      index: true,
    },
    adminExtra: { type: moneySchema, default: () => ({}) },
    adminTotal: { type: moneySchema, default: () => ({}) },
    adminNote: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

customPackageRequestSchema.index({ user: 1, status: 1, createdAt: -1 });

export default mongoose.model(
  "CustomPackageRequest",
  customPackageRequestSchema
);

