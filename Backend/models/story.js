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
    type: {
      type: String,
      enum: ["hajj", "umrah"],
      required: true,
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

export default mongoose.model("Story", storySchema);

