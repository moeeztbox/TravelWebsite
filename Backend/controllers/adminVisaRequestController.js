import VisaRequest from "../models/visaRequest.js";

export const adminListVisaRequests = async (req, res) => {
  try {
    const status = (req.query.status || "all").toString();
    const query = status === "all" ? {} : { status };
    const visaRequests = await VisaRequest.find(query)
      .populate("user", "firstName lastName email")
      .sort({ createdAt: -1, _id: -1 });
    res.json({ visaRequests });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const adminSetVisaRequestStatus = async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!["approved", "rejected", "pending", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const existing = await VisaRequest.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });

    if (status !== "cancelled" && existing.status === "rejected" && status === "approved") {
      return res.status(400).json({ message: "Cannot approve a rejected request." });
    }
    if (status !== "cancelled" && existing.status === "approved" && status === "rejected") {
      return res.status(400).json({ message: "Cannot reject an approved request." });
    }
    if (status === "rejected" && existing.payment?.status === "verified") {
      return res.status(400).json({
        message: "Cannot reject after payment is verified.",
      });
    }

    const shouldResetPayment =
      status !== "approved" || existing.payment?.status === "rejected";

    const visaRequest = await VisaRequest.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status,
          statusReason:
            status === "rejected"
              ? "admin_rejected"
              : status === "cancelled"
                ? "admin_cancelled"
                : "",
          ...(shouldResetPayment
            ? {
                "payment.status": "none",
                "payment.receiptPdf": "",
                "payment.stripePaymentIntentId": "",
              }
            : {}),
        },
      },
      { new: true, runValidators: true }
    ).populate("user", "firstName lastName email");

    res.json({ visaRequest });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const adminSetVisaPaymentStatus = async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!["verified", "rejected", "verifying"].includes(status)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    if (status === "verified") {
      const existing = await VisaRequest.findById(req.params.id);
      if (!existing) return res.status(404).json({ message: "Not found" });
      if (existing.status !== "approved") {
        return res.status(400).json({ message: "Only approved requests can be verified" });
      }
      const isStripe = existing.payment?.method === "stripe";
      const hasReceipt = Boolean(existing.payment?.receiptPdf);
      const hasStripeProof =
        isStripe && Boolean(existing.payment?.stripePaymentIntentId);
      if (isStripe) {
        if (!hasStripeProof) {
          return res.status(400).json({
            message: "Cannot verify: completed Stripe payment required.",
          });
        }
      } else if (!hasReceipt) {
        return res.status(400).json({ message: "Receipt PDF required." });
      }
      if (existing.payment?.status !== "verifying") {
        return res.status(400).json({
          message: "Payment must be awaiting verification (verifying).",
        });
      }
    }

    const set =
      status === "rejected"
        ? {
            status: "rejected",
            statusReason: "payment_failed",
            "payment.status": "rejected",
          }
        : { "payment.status": status };

    const visaRequest = await VisaRequest.findByIdAndUpdate(
      req.params.id,
      { $set: set },
      { new: true, runValidators: true }
    ).populate("user", "firstName lastName email");

    if (!visaRequest) return res.status(404).json({ message: "Not found" });
    res.json({ visaRequest });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const adminDeleteVisaRequest = async (req, res) => {
  try {
    const existing = await VisaRequest.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });
    if (existing.status !== "cancelled") {
      return res.status(400).json({
        message: "Only cancelled requests can be deleted.",
      });
    }
    await VisaRequest.deleteOne({ _id: existing._id });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message || "Server error" });
  }
};
