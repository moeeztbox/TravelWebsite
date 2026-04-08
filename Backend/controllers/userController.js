import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

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

export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      address = "",
      country = "",
      city = "",
    } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "An account with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      address,
      country,
      city,
    });

    const token = signToken(user);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: toUserPayload(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
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

export const updateProfile = async (req, res) => {
  try {
    const { phone, bitmojiIndex, address, country, city } = req.body;
    const updates = {};

    if (phone !== undefined) updates.phone = String(phone).trim();
    if (address !== undefined) updates.address = String(address).trim();
    if (country !== undefined) updates.country = String(country).trim();
    if (city !== undefined) updates.city = String(city).trim();
    if (bitmojiIndex !== undefined) {
      const n = Number(bitmojiIndex);
      updates.bitmojiIndex = Number.isFinite(n)
        ? Math.min(7, Math.max(0, Math.floor(n)))
        : 0;
    }

    const user = await User.findByIdAndUpdate(req.user._id, { $set: updates }, {
      new: true,
    }).select("-password");

    res.json({ user: toUserPayload(user) });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};
