import mongoose from "mongoose";

const highlightSchema = new mongoose.Schema(
  {
    iconKey: { type: String, default: "map-pin" },
    text: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const packageSchema = new mongoose.Schema(
  {
    packageId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    order: { type: Number, default: 0 },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "" },
    price: { type: String, default: "" },
    duration: { type: String, default: "" },
    badge: { type: String, default: "" },
    image: { type: String, default: "" },
    highlights: [highlightSchema],
    services: {
      ziyarat: { type: Boolean, default: false },
      transport: { type: Boolean, default: false },
      visa: { type: Boolean, default: false },
      ticket: { type: Boolean, default: false },
      hotel: { type: Boolean, default: false },
    },
    active: { type: Boolean, default: true },
    featured: { type: Boolean, default: false, index: true },
  },
  { timestamps: true, collection: "packages" }
);

export default mongoose.model("Package", packageSchema);
