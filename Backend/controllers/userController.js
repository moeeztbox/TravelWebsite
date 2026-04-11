import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import User from "../models/user.js";

async function sendPasswordResetEmail(toEmail, resetUrl) {
  const MAIL_USER = String(process.env.MAIL_USER || "").trim();
  const MAIL_PASS = String(process.env.MAIL_PASS || "").trim();
  if (!MAIL_USER || !MAIL_PASS) {
    const err = new Error(
      "Email is not configured (MAIL_USER / MAIL_PASS in Backend/.env)"
    );
    err.code = "MAIL_NOT_CONFIGURED";
    throw err;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: MAIL_USER, pass: MAIL_PASS },
  });

  await transporter.sendMail({
    from: `"Al Buraq Travel" <${MAIL_USER}>`,
    to: toEmail,
    subject: "Reset your password",
    text: `We received a request to reset your password.\n\nOpen this link (valid for 1 hour):\n${resetUrl}\n\nIf you did not request this, you can ignore this email.`,
    html: `<p>We received a request to reset your password.</p><p><a href="${resetUrl}">Reset your password</a> (link valid for 1 hour)</p><p>If you did not request this, you can ignore this email.</p>`,
  });
}

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

export const requestPasswordReset = async (req, res) => {
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();
    const generic = {
      message:
        "If an account exists for that email, you will receive password reset instructions shortly.",
    };

    const user = await User.findOne({ email });
    if (!user) {
      return res.json(generic);
    }

    const token = jwt.sign(
      { userId: user._id.toString(), purpose: "password-reset" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const clientOrigin = String(
      process.env.CLIENT_ORIGIN || "http://localhost:5173"
    ).replace(/\/+$/, "");
    const resetUrl = `${clientOrigin}/reset-password?token=${encodeURIComponent(token)}`;

    try {
      await sendPasswordResetEmail(user.email, resetUrl);
    } catch (mailErr) {
      console.error("requestPasswordReset email:", mailErr);
      if (mailErr.code === "MAIL_NOT_CONFIGURED") {
        return res.status(503).json({
          message:
            "Password reset email is not configured on the server. Add MAIL_USER and MAIL_PASS to Backend/.env.",
        });
      }
      return res.status(500).json({
        message: "Could not send reset email. Please try again later.",
      });
    }

    return res.json(generic);
  } catch (error) {
    console.error("requestPasswordReset:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const resetPasswordWithToken = async (req, res) => {
  try {
    const { token, password } = req.body;

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(400).json({
        message:
          "Invalid or expired reset link. Please request a new password reset.",
      });
    }

    if (decoded.purpose !== "password-reset" || !decoded.userId) {
      return res.status(400).json({ message: "Invalid reset link." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: { password: hashedPassword } },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(400).json({ message: "Account not found." });
    }

    res.json({
      message: "Password updated. You can sign in with your new password.",
    });
  } catch (error) {
    console.error("resetPasswordWithToken:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
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
