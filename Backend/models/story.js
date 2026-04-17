import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 140 },
    displayName: { type: String, default: "", trim: true, maxlength: 60 },
    username: { type: String, default: "", trim: true, maxlength: 40, index: true },
    type: {
      type: String,
      enum: ["hajj", "umrah"],
      required: true,
      index: true,
    },
    location: { type: String, default: "", trim: true, maxlength: 120 },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    kind: {
      type: String,
      enum: ["story", "review"],
      default: "story",
      index: true,
    },
    text: { type: String, default: "", trim: true, maxlength: 12000 },
    videoUrl: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    rejectionReason: { type: String, default: "", trim: true, maxlength: 400 },
  },
  { timestamps: true, collection: "stories" }
);

storySchema.index({ status: 1, createdAt: -1 });
storySchema.index({ type: 1, rating: -1, createdAt: -1 });

export default mongoose.model("Story", storySchema);

