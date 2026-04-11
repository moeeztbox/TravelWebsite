import mongoose from "mongoose";

const transportationOptionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    priceLabel: { type: String, default: "" },
    priceAmount: { type: Number, default: 0 },
    /** Match when user's selected service type is in this list */
    serviceTypes: [{ type: String, trim: true }],
    /** Match when user's vehicle type equals one of these */
    vehicleTypes: [{ type: String, trim: true }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("TransportationOption", transportationOptionSchema);
