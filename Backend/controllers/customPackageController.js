import CustomPackageRequest from "../models/customPackageRequest.js";
import Booking from "../models/booking.js";

function asNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export const createCustomPackageRequest = async (req, res) => {
  try {
    const {
      fullName,
      city = "",
      phone = "",
      email,
      passengers,
      startDate,
      hotelCategory,
      packageType = "customize",
      notes = "",
      estimate,
    } = req.body || {};

    if (!fullName || !email || !startDate) {
      return res
        .status(400)
        .json({ message: "fullName, email and startDate are required" });
    }

    const pax = Math.max(1, Math.floor(asNumber(passengers, 1)));
    const cat = Math.floor(asNumber(hotelCategory, 3));
    if (![2, 3, 4, 5].includes(cat)) {
      return res.status(400).json({ message: "hotelCategory must be 2-5" });
    }

    const dt = new Date(startDate);
    if (Number.isNaN(dt.getTime())) {
      return res.status(400).json({ message: "startDate is invalid" });
    }

    const doc = await CustomPackageRequest.create({
      user: req.user._id,
      fullName: String(fullName).trim(),
      city: String(city || "").trim(),
      phone: String(phone || "").trim(),
      email: String(email).trim().toLowerCase(),
      passengers: pax,
      startDate: dt,
      hotelCategory: cat,
      packageType: packageType === "group" ? "group" : "customize",
      notes: String(notes || "").trim(),
      estimate: estimate && typeof estimate === "object" ? estimate : undefined,
    });

    res.status(201).json({ request: doc });
  } catch (error) {
    console.error("createCustomPackageRequest:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const listMyCustomPackageRequests = async (req, res) => {
  try {
    const list = await CustomPackageRequest.find({ user: req.user._id })
      .sort({ updatedAt: -1 })
      .lean();
    res.json({ requests: list });
  } catch (error) {
    console.error("listMyCustomPackageRequests:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const acceptApprovedCustomPackage = async (req, res) => {
  try {
    const doc = await CustomPackageRequest.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!doc) return res.status(404).json({ message: "Request not found" });

    if (doc.status !== "approved") {
      return res
        .status(400)
        .json({ message: "Only approved requests can be accepted" });
    }

    const total = Number(doc.adminTotal?.amount || 0);
    if (!Number.isFinite(total) || total <= 0) {
      return res.status(400).json({
        message: "Admin must set a final total amount before you can accept",
      });
    }

    if (doc.bookingId) {
      const existing = await Booking.findById(doc.bookingId);
      if (existing) return res.json({ booking: existing, request: doc });
      doc.bookingId = null;
      await doc.save();
    }

    const booking = await Booking.create({
      user: req.user._id,
      packageId: `custom-${doc._id}`,
      packageTitle: "Custom Package",
      packageSubtitle: `${doc.hotelCategory} Star · ${doc.passengers} Passenger(s)`,
      packagePrice: `PKR ${total.toLocaleString()}`,
      packageDuration: "Custom",
      badge: "Custom",
      status: "approved",
      statusReason: "",
      payment: { status: "none", receiptPdf: "" },
      documents: { visaPdf: "", otherPdf: "" },
      journey: { stage: "not_started" },
    });

    doc.bookingId = booking._id;
    await doc.save();

    res.json({ booking, request: doc });
  } catch (error) {
    console.error("acceptApprovedCustomPackage:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

