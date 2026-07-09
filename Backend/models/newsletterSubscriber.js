import mongoose from "mongoose";

const newsletterSubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["subscribed", "unsubscribed"],
      default: "subscribed",
    },
    subscribedAt: { type: Date },
    unsubscribedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model(
  "NewsletterSubscriber",
  newsletterSubscriberSchema
);

