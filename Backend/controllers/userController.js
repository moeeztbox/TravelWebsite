import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/user.js";
import { firebaseAuth } from "../config/firebaseAdmin.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

export const loginWithFirebase = async (req, res) => {
  try {
    const idToken = String(req.body.idToken || "").trim();
    if (!idToken) {
      return res.status(400).json({ message: "Firebase idToken is required" });
    }

    let decoded;
    try {
      decoded = await firebaseAuth().verifyIdToken(idToken);
    } catch (e) {
      if (e?.code === "FIREBASE_ADMIN_NOT_CONFIGURED") {
        return res.status(503).json({
          message:
            "Google login is not configured on the server. Set FIREBASE_SERVICE_ACCOUNT (service account JSON) or GOOGLE_APPLICATION_CREDENTIALS, then restart the backend.",
        });
      }
      console.error("loginWithFirebase verifyIdToken:", e);
      return res.status(401).json({
        message:
          process.env.NODE_ENV === "production"
            ? "Invalid Google sign-in token. Please try again."
            : `Invalid Google sign-in token: ${e?.message || "unknown error"}`,
      });
    }

    const firebaseUid = String(decoded.uid || "").trim();
    const email = String(decoded.email || "").trim().toLowerCase();
    const name = String(decoded.name || "").trim();
    const picture = String(decoded.picture || "").trim();

    if (!firebaseUid || !email) {
      return res.status(400).json({
        message: "Google account did not provide an email address.",
      });
    }

    const [firstNameRaw, ...rest] = name.split(/\s+/).filter(Boolean);
    const firstName = firstNameRaw || "Google";
    const lastName = rest.length ? rest.join(" ") : "User";

    // Find by email first (keeps existing users stable), else by firebaseUid.
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.findOne({ firebaseUid });
    }

    if (!user) {
      user = await User.create({
        firstName,
        lastName,
        email,
        authProvider: "firebase",
        firebaseUid,
        photoURL: picture,
        // password intentionally omitted for Firebase users
      });
    } else {
      const updates = {};
      if (user.authProvider !== "firebase") updates.authProvider = "firebase";
      if (!user.firebaseUid) updates.firebaseUid = firebaseUid;
      if (picture && user.photoURL !== picture) updates.photoURL = picture;
      if (Object.keys(updates).length) {
        user = await User.findByIdAndUpdate(user._id, { $set: updates }, { new: true });
      }
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

export const uploadCommonDocuments = async (req, res) => {
  try {
    const userId = req.user?._id ?? req.user?.id;
    const base = "/uploads/user-docs";
    const updates = {};

    if (req.files?.visaPdf?.[0]) {
      updates["commonDocuments.visaPdf"] = `${base}/${req.files.visaPdf[0].filename}`;
    }
    if (req.files?.otherPdf?.[0]) {
      updates["commonDocuments.otherPdf"] = `${base}/${req.files.otherPdf[0].filename}`;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No PDF files received" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    ).select("-password");

    res.json({
      message: "Documents uploaded successfully",
      user: toUserPayload(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const deleteCommonDocument = async (req, res) => {
  try {
    const userId = req.user?._id ?? req.user?.id;
    const doc = String(req.query.doc || "").trim();
    if (!["visaPdf", "otherPdf"].includes(doc)) {
      return res.status(400).json({ message: "Invalid doc. Use visaPdf or otherPdf." });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const currentPath =
      doc === "visaPdf"
        ? user.commonDocuments?.visaPdf
        : user.commonDocuments?.otherPdf;

    // Clear DB first (even if file delete fails).
    const updates =
      doc === "visaPdf"
        ? { "commonDocuments.visaPdf": "" }
        : { "commonDocuments.otherPdf": "" };

    const updated = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    ).select("-password");

    // Best-effort file removal (only if it's inside /uploads/user-docs)
    try {
      const rel = String(currentPath || "");
      if (rel.startsWith("/uploads/user-docs/")) {
        const filename = rel.replace("/uploads/user-docs/", "");
        const abs = path.join(__dirname, "../uploads/user-docs", filename);
        if (fs.existsSync(abs)) fs.unlinkSync(abs);
      }
    } catch (e) {
      console.error("deleteCommonDocument file delete failed:", e);
    }

    return res.json({ message: "Document deleted", user: toUserPayload(updated) });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};
