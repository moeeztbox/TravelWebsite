import Booking from "../models/booking.js";

export const listAllBookings = async (req, res) => {
  try {
    const status = (req.query.status || "pending").toString();
    const query = status === "all" ? {} : { status };

    const bookings = await Booking.find(query)
      .populate("user", "firstName lastName email")
      // Keep list stable when admin updates status/payment/journey (updatedAt changes).
      .sort({ createdAt: -1, _id: -1 });

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

    const existing = await Booking.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (existing.status === "rejected" && status === "approved") {
      return res.status(400).json({
        message: "Rejected bookings cannot be approved.",
      });
    }

    if (existing.status === "approved" && status === "rejected") {
      return res.status(400).json({
        message: "Approved bookings cannot be rejected.",
      });
    }

    // Safety: once payment is verified (or journey scheduled), do not allow rejecting/rolling back.
    const paymentVerified = existing.payment?.status === "verified";
    const journeyScheduled = Boolean(existing.journey?.startAt);
    if (status === "rejected" && (paymentVerified || journeyScheduled)) {
      return res.status(400).json({
        message:
          "Cannot reject this booking after payment is verified or the journey is scheduled.",
      });
    }

    const shouldResetPayment =
      status !== "approved" || existing.payment?.status === "rejected";

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status,
          statusReason: status === "rejected" ? "admin_rejected" : "",
          ...(shouldResetPayment
            ? {
                "payment.status": "none",
                "payment.receiptPdf": "",
              }
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
      const isStripe = existing.payment?.method === "stripe";
      const hasStripeProof =
        isStripe && Boolean(existing.payment?.stripePaymentIntentId);

      const missing = [];
      if (!hasVisa) missing.push("visa PDF");
      if (!hasOther) missing.push("other document PDF");
      if (isStripe) {
        if (!hasStripeProof) missing.push("completed Stripe payment");
      } else {
        if (!hasReceipt) missing.push("receipt PDF");
      }

      if (missing.length > 0) {
        return res.status(400).json({
          message: `Cannot verify payment: ${missing.join(", ")} required.`,
        });
      }

      if (existing.payment?.status !== "verifying") {
        return res.status(400).json({
          message:
            "Cannot verify payment: payment must be awaiting verification (verifying) first.",
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

    const prevJourney = booking.journey?.toObject
      ? booking.journey.toObject()
      : booking.journey;
    const prevStart = prevJourney?.startAt
      ? new Date(prevJourney.startAt)
      : null;
    const journeyInProgressStages = new Set([
      "flight_takeoff",
      "in_makkah",
      "in_madinah",
      "return_flight",
      "completed",
    ]);
    if (prevStart && !Number.isNaN(prevStart.getTime())) {
      const scheduledTimeReached = Date.now() >= prevStart.getTime();
      const stagePastScheduled = journeyInProgressStages.has(
        prevJourney?.stage || ""
      );
      if (scheduledTimeReached || stagePastScheduled) {
        return res.status(400).json({
          message: "Cannot reschedule after the journey has started.",
        });
      }
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

export const adminDeleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (booking.status !== "rejected") {
      return res.status(400).json({
        message: "Only rejected bookings can be removed.",
      });
    }
    await Booking.deleteOne({ _id: booking._id });
    res.json({ message: "Booking removed" });
  } catch (error) {
    console.error("adminDeleteBooking:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

