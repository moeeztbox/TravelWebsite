import CustomPackageRequest from "../models/customPackageRequest.js";

function asMoney(v) {
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n);
}

export const adminListCustomPackageRequests = async (req, res) => {
  try {
    const status = (req.query.status || "pending").toString();
    const query = status === "all" ? {} : { status };

    const requests = await CustomPackageRequest.find(query)
      .populate("user", "firstName lastName email")
      .sort({ updatedAt: -1 });

    res.json({ requests });
  } catch (error) {
    console.error("adminListCustomPackageRequests:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const adminUpdateCustomPackageRequest = async (req, res) => {
  try {
    const { status, extraAmount, totalAmount, adminNote } = req.body || {};
    if (status && !["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const update = {};
    if (status) update.status = status;
    if (adminNote !== undefined) update.adminNote = String(adminNote || "").trim();

    if (status === "approved") {
      update.userProposalStatus = "awaiting_response";
    }

    if (extraAmount !== undefined) {
      const m = asMoney(extraAmount);
      if (m === null) return res.status(400).json({ message: "extraAmount must be a positive number" });
      update["adminExtra.currency"] = "PKR";
      update["adminExtra.amount"] = m;
    }

    if (totalAmount !== undefined) {
      const m = asMoney(totalAmount);
      if (m === null) return res.status(400).json({ message: "totalAmount must be a positive number" });
      update["adminTotal.currency"] = "PKR";
      update["adminTotal.amount"] = m;
    }

    const mongoUpdate = { $set: update };
    if (status === "rejected") {
      mongoUpdate.$unset = { userProposalStatus: "" };
    }

    const doc = await CustomPackageRequest.findByIdAndUpdate(
      req.params.id,
      mongoUpdate,
      { new: true, runValidators: true }
    ).populate("user", "firstName lastName email");

    if (!doc) return res.status(404).json({ message: "Request not found" });

    res.json({ request: doc });
  } catch (error) {
    console.error("adminUpdateCustomPackageRequest:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const adminDeleteCustomPackageRequest = async (req, res) => {
  try {
    const doc = await CustomPackageRequest.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Request not found" });

    if (doc.userProposalStatus !== "rejected") {
      return res.status(400).json({
        message:
          "Only requests the user declined can be removed here. Reject from the user first, or use admin reject.",
      });
    }

    await CustomPackageRequest.deleteOne({ _id: doc._id });
    res.json({ ok: true });
  } catch (error) {
    console.error("adminDeleteCustomPackageRequest:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

