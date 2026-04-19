import Booking from "../models/booking.js";
import User from "../models/user.js";

export const attachDocuments = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: userId,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "approved") {
      return res.status(400).json({
        message: "Waiting for admin approval. Upload documents after approval.",
      });
    }

    const base = "/uploads/bookings";
    const updates = {};

    if (req.files?.visaPdf?.[0]) {
      updates["documents.visaPdf"] = `${base}/${req.files.visaPdf[0].filename}`;
    }
    if (req.files?.otherPdf?.[0]) {
      updates["documents.otherPdf"] = `${base}/${req.files.otherPdf[0].filename}`;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No PDF files received" });
    }

    const updated = await Booking.findByIdAndUpdate(
      booking._id,
      { $set: updates },
      { new: true }
    );

    res.json({
      message: "Documents uploaded successfully",
      booking: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const attachCommonDocuments = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    const booking = await Booking.findOne({ _id: req.params.id, user: userId });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (booking.status !== "approved") {
      return res.status(400).json({
        message: "Waiting for admin approval. Attach documents after approval.",
      });
    }

    const user = await User.findById(userId).select("commonDocuments");
    const common = user?.commonDocuments || {};
    const updates = {};
    if (common.visaPdf) updates["documents.visaPdf"] = common.visaPdf;
    if (common.otherPdf) updates["documents.otherPdf"] = common.otherPdf;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No common documents found. Upload them from Profile tips first.",
      });
    }

    const updated = await Booking.findByIdAndUpdate(
      booking._id,
      { $set: updates },
      { new: true }
    );

    res.json({
      message: "Common documents attached to booking",
      booking: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

const PAYMENT_METHODS = ["jazzcash", "easypaisa", "bank_transfer"];

export const attachPaymentReceipt = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: userId,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "approved") {
      return res.status(400).json({
        message: "Waiting for admin approval. Submit payment after approval.",
      });
    }

    if (booking.payment?.status === "verified") {
      return res.status(400).json({
        message: "Payment already verified.",
      });
    }

    const method = String(req.body?.method || "").trim();
    if (!method || !PAYMENT_METHODS.includes(method)) {
      return res.status(400).json({
        message: "Select a payment method before uploading the receipt.",
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No PDF files received" });
    }

    const base = "/uploads/bookings";
    const updated = await Booking.findByIdAndUpdate(
      booking._id,
      {
        $set: {
          "payment.receiptPdf": `${base}/${req.file.filename}`,
          "payment.status": "verifying",
          "payment.method": method,
        },
      },
      { new: true }
    );

    res.json({
      message: "Receipt submitted. Payment is now verifying.",
      booking: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};
