import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/user.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url));


 

const signToken = (userDoc) => {
  const role = userDoc?.role || "user";
  const email = userDoc?.email;
  return jwt.sign(
    { userId: userDoc._id, role, email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const toUserPayload = (userDoc) => {
  const u = userDoc.toSafeObject ? userDoc.toSafeObject() : userDoc.toObject();
  delete u.password;
  return u;
};


 

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (!user.password) {
      return res.status(401).json({
        message:
          "This account uses Google sign-in. Please continue with Google.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(user);

    res.json({
      message: "Login successful",
      token,
      user: toUserPayload(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};



export const getMe = async (req, res) => {
  res.json({ user: req.user });
};







