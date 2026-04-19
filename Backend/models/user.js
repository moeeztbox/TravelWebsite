import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
    authProvider: {
      type: String,
      enum: ["local", "firebase"],
      default: "local",
      index: true,
    },
    firebaseUid: {
      type: String,
      default: "",
      index: true,
    },
    photoURL: {
      type: String,
      default: "",
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "isAdmin"],
      default: "user",
      index: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    country: {
      type: String,
      default: "",
      trim: true,
    },
    city: {
      type: String,
      default: "",
      trim: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    bitmojiIndex: {
      type: Number,
      default: 0,
      min: 0,
      max: 7,
    },
    commonDocuments: {
      visaPdf: { type: String, default: "" },
      otherPdf: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

userSchema.methods.toSafeObject = function toSafeObject() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", userSchema);
