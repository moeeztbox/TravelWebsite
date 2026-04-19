import VisaOption from "../models/visaOption.js";
import VisaRequest from "../models/visaRequest.js";

function durationToDays(duration) {
  const m = /^(\d+)\s*Days?$/i.exec((duration || "").trim());
  return m ? parseInt(m[1], 10) : 30;
}

export const listVisaOptions = async (_req, res) => {
  try {
    const options = await VisaOption.find({ active: true }).sort({
      priceAmount: 1,
    });
    res.json({ options });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const createVisaRequest = async (req, res) => {
  try {
    const { selectedOption, form } = req.body || {};
    if (!selectedOption?.optionId || !selectedOption?.title) {
      return res.status(400).json({ message: "selectedOption is required" });
    }
    if (!form?.visaType || !form?.nationality || !form?.duration) {
      return res.status(400).json({ message: "Incomplete visa form" });
    }

    const adults = Math.max(0, Number(form.adults) || 0);
    const children = Math.max(0, Number(form.children) || 0);
    const infants = Math.max(0, Number(form.infants) || 0);
    const membersCount = adults + children + infants;
    if (membersCount < 1) {
      return res.status(400).json({ message: "At least one traveller required" });
    }

    const opt = await VisaOption.findOne({ key: String(selectedOption.optionId) });
    if (!opt) {
      return res.status(400).json({ message: "Invalid visa option" });
    }

    const userId = req.user._id ?? req.user.id;
    const serviceEndDate = new Date();
    serviceEndDate.setDate(
      serviceEndDate.getDate() + durationToDays(form.duration)
    );

    const perPerson = Number(opt.priceAmount) || 0;
    const totalUsd = Math.round(perPerson * membersCount * 100) / 100;
    const priceLabel = `USD ${totalUsd} (${membersCount} traveller${membersCount !== 1 ? "s" : ""} × USD ${perPerson})`;

    const doc = await VisaRequest.create({
      user: userId,
      status: "pending",
      selectedOption: {
        optionId: String(selectedOption.optionId),
        title: opt.title || selectedOption.title,
        description: opt.description || selectedOption.description || "",
        priceLabel,
        priceAmount: totalUsd,
        tier: opt.tier || selectedOption.tier || "",
      },
      form: {
        visaType: form.visaType,
        nationality: form.nationality,
        duration: form.duration,
        adults,
        children,
        infants,
        massar: form.massar || "",
      },
      membersCount,
      serviceEndDate,
    });

    res.status(201).json({ visaRequest: doc });
  } catch (e) {
    console.error("createVisaRequest:", e);
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const listMyVisaRequests = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    const visaRequests = await VisaRequest.find({
      user: userId,
      dismissedByUser: false,
    }).sort({ updatedAt: -1 });
    res.json({ visaRequests });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const setMyVisaPaymentMethod = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    const { method } = req.body || {};
    const allowed = ["", "jazzcash", "easypaisa", "bank_transfer", "stripe"];
    const next = String(method || "").trim();
    if (!allowed.includes(next)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    const doc = await VisaRequest.findOne({ _id: req.params.id, user: userId });
    if (!doc) return res.status(404).json({ message: "Request not found" });
    if (doc.status !== "approved") {
      return res.status(400).json({ message: "Wait for admin approval first." });
    }
    if (doc.payment?.status === "verified") {
      return res.status(400).json({ message: "Payment already verified." });
    }

    doc.payment = {
      ...(doc.payment?.toObject ? doc.payment.toObject() : doc.payment),
      method: next,
    };
    await doc.save();
    res.json({ visaRequest: doc });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const attachVisaPaymentReceipt = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    if (!req.file?.filename) {
      return res.status(400).json({ message: "receiptPdf PDF required" });
    }

    const doc = await VisaRequest.findOne({ _id: req.params.id, user: userId });
    if (!doc) return res.status(404).json({ message: "Request not found" });
    if (doc.status !== "approved") {
      return res.status(400).json({ message: "Request must be approved." });
    }
    const method = (doc.payment?.method || "").trim();
    if (!method) {
      return res.status(400).json({ message: "Select a payment method first." });
    }
    if (method === "stripe") {
      return res.status(400).json({
        message: "Use the card payment form for Stripe—no receipt upload.",
      });
    }

    doc.payment = {
      ...(doc.payment?.toObject ? doc.payment.toObject() : doc.payment),
      receiptPdf: req.file.filename,
      status: "verifying",
    };
    await doc.save();
    res.json({ visaRequest: doc });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const dismissVisaRequest = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    const doc = await VisaRequest.findOne({ _id: req.params.id, user: userId });
    if (!doc) return res.status(404).json({ message: "Request not found" });

    if (doc.status === "rejected" || doc.status === "cancelled") {
      doc.dismissedByUser = true;
      await doc.save();
      return res.json({ message: "Removed", visaRequest: doc });
    }

    if (doc.payment?.status !== "verified") {
      return res.status(400).json({
        message: "Only completed, rejected, or cancelled requests can be removed.",
      });
    }

    const end = doc.serviceEndDate;
    if (!end || Date.now() < new Date(end).getTime()) {
      return res.status(400).json({
        message:
          "You can remove this after the processing window end date has passed.",
      });
    }

    doc.dismissedByUser = true;
    await doc.save();
    res.json({ message: "Removed", visaRequest: doc });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};
