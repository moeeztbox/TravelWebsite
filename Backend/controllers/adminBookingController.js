import Booking from "../models/booking.js";

export const listAllBookings = async (req, res) => {
  try {
    const status = (req.query.status || "pending").toString();
    const query = status === "all" ? {} : { status };

    const bookings = await Booking.find(query)
      .populate("user", "firstName lastName email")
      .sort({ updatedAt: -1 });

    res.json({ bookings });
  } catch (error) {
    console.error("listAllBookings:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const setBookingStatus = async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status,
          statusReason: status === "rejected" ? "admin_rejected" : "",
          // Reset payment when returning to draft
          ...(status !== "approved"
            ? { "payment.status": "none" }
            : {}),
        },
      },
      { new: true, runValidators: true }
    ).populate("user", "firstName lastName email");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ booking });
  } catch (error) {
    console.error("setBookingStatus:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const setPaymentStatus = async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!["verified", "rejected", "verifying"].includes(status)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    if (status === "verified") {
      const existing = await Booking.findById(req.params.id);
      if (!existing) return res.status(404).json({ message: "Booking not found" });
      if (existing.status !== "approved") {
        return res
          .status(400)
          .json({ message: "Only approved bookings can be verified" });
      }
      const hasVisa = Boolean(existing.documents?.visaPdf);
      const hasOther = Boolean(existing.documents?.otherPdf);
      const hasReceipt = Boolean(existing.payment?.receiptPdf);
      if (!hasVisa || !hasOther || !hasReceipt) {
        return res.status(400).json({
          message:
            "Cannot verify payment: visa PDF, other document PDF, and receipt PDF are required.",
        });
      }
      if (existing.payment?.status !== "verifying") {
        return res.status(400).json({
          message: "Cannot verify payment: receipt must be submitted first.",
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

    const booking = await Booking.findByIdAndUpdate(req.params.id, { $set: set }, { new: true, runValidators: true })
      .populate("user", "firstName lastName email");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ booking });
  } catch (error) {
    console.error("setPaymentStatus:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const scheduleJourney = async (req, res) => {
  try {
    const { startAt } = req.body || {};
    const dt = startAt ? new Date(startAt) : null;
    if (!dt || Number.isNaN(dt.getTime())) {
      return res.status(400).json({ message: "Valid startAt is required" });
    }

    const booking = await Booking.findById(req.params.id).populate(
      "user",
      "firstName lastName email"
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.status !== "approved") {
      return res
        .status(400)
        .json({ message: "Only approved bookings can be scheduled" });
    }
    if (booking.payment?.status !== "verified") {
      return res.status(400).json({
        message: "Payment must be verified before scheduling the journey",
      });
    }

    booking.journey = {
      ...(booking.journey?.toObject ? booking.journey.toObject() : booking.journey),
      startAt: dt,
      stage: "scheduled",
      updatedAt: new Date(),
    };
    await booking.save();

    res.json({ booking });
  } catch (error) {
    console.error("scheduleJourney:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const setJourneyStage = async (req, res) => {
  try {
    const { stage } = req.body || {};
    const allowed = [
      "scheduled",
      "flight_takeoff",
      "in_makkah",
      "in_madinah",
      "return_flight",
      "completed",
    ];
    if (!allowed.includes(stage)) {
      return res.status(400).json({ message: "Invalid stage" });
    }

    const bookingDoc = await Booking.findById(req.params.id).populate(
      "user",
      "firstName lastName email"
    );
    if (!bookingDoc) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const startAt = bookingDoc.journey?.startAt
      ? new Date(bookingDoc.journey.startAt)
      : null;
    if (!startAt || Number.isNaN(startAt.getTime())) {
      return res.status(400).json({
        message: "Cannot update stage: booking has no scheduled start time.",
      });
    }

    const now = Date.now();
    if (now < startAt.getTime()) {
      return res.status(400).json({
        message:
          "Cannot update stage before the scheduled start time is reached.",
      });
    }

    bookingDoc.journey = {
      ...(bookingDoc.journey?.toObject
        ? bookingDoc.journey.toObject()
        : bookingDoc.journey),
      stage,
      updatedAt: new Date(),
    };
    await bookingDoc.save();

    res.json({ booking: bookingDoc });
  } catch (error) {
    console.error("setJourneyStage:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

