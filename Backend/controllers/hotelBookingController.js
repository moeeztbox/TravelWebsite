import HotelBooking from "../models/hotelBooking.js";

function toDateOrNull(v) {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

function toInt(v, fallback) {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.floor(n);
}

export const createHotelBooking = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    const { hotel, stay, quoteTotal } = req.body || {};

    const hotelId = String(hotel?.hotelId || hotel?.id || "").trim();
    const name = String(hotel?.name || "").trim();
    if (!hotelId || !name) {
      return res.status(400).json({ message: "hotelId and name are required" });
    }

    const checkIn = toDateOrNull(stay?.checkIn);
    const checkOut = toDateOrNull(stay?.checkOut);
    if (!checkIn || !checkOut) {
      return res.status(400).json({ message: "checkIn and checkOut are required" });
    }
    if (checkOut.getTime() <= checkIn.getTime()) {
      return res.status(400).json({ message: "checkOut must be after checkIn" });
    }

    const qAmt = Number(quoteTotal?.amount);
    const hasQuote = Number.isFinite(qAmt) && qAmt > 0;

    const booking = await HotelBooking.create({
      user: userId,
      status: "pending",
      hotel: {
        hotelId,
        name,
        address: String(hotel?.address || ""),
        city: String(hotel?.city || ""),
        country: String(hotel?.country || ""),
        image: String(hotel?.image || hotel?.mainPhoto || ""),
        starRating: Number(hotel?.starRating) || 0,
        rating: Number(hotel?.rating) || 0,
        currency: String(hotel?.currency || "USD"),
      },
      stay: {
        checkIn,
        checkOut,
        rooms: Math.max(1, toInt(stay?.rooms, 1) || 1),
        adults: Math.max(1, toInt(stay?.adults, 2) || 2),
        children: Math.max(0, toInt(stay?.children, 0) || 0),
      },
      ...(hasQuote
        ? {
            quoteTotal: {
              amount: qAmt,
              currency: String(quoteTotal.currency || "USD").toUpperCase(),
              label: String(quoteTotal.label || "Search quote"),
            },
          }
        : {}),
    });

    res.status(201).json({ booking });
  } catch (e) {
    console.error("createHotelBooking:", e);
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const listMyHotelBookings = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    const bookings = await HotelBooking.find({
      user: userId,
      dismissedByUser: false,
    }).sort({ updatedAt: -1, _id: -1 });
    res.json({ bookings });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const setMyHotelPaymentMethod = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    const { method } = req.body || {};
    const allowed = ["", "jazzcash", "easypaisa", "bank_transfer", "stripe"];
    const next = String(method || "").trim();
    if (!allowed.includes(next)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    const booking = await HotelBooking.findOne({ _id: req.params.id, user: userId });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.status !== "approved") {
      return res.status(400).json({ message: "Booking must be approved." });
    }
    if (booking.payment?.status === "verified") {
      return res.status(400).json({ message: "Payment already verified." });
    }

    booking.payment = {
      ...(booking.payment?.toObject ? booking.payment.toObject() : booking.payment),
      method: next,
    };
    await booking.save();
    res.json({ booking });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const attachHotelPaymentReceipt = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    if (!req.file?.filename) {
      return res.status(400).json({ message: "receiptPdf PDF required" });
    }

    const booking = await HotelBooking.findOne({ _id: req.params.id, user: userId });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.status !== "approved") {
      return res.status(400).json({ message: "Booking must be approved." });
    }

    const method = (booking.payment?.method || "").trim();
    if (!method) {
      return res.status(400).json({ message: "Select a payment method first." });
    }
    if (method === "stripe") {
      return res.status(400).json({
        message: "Use the card payment form for Stripe—no receipt upload.",
      });
    }

    booking.payment = {
      ...(booking.payment?.toObject ? booking.payment.toObject() : booking.payment),
      receiptPdf: req.file.filename,
      status: "verifying",
    };
    await booking.save();
    res.json({ booking });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const dismissHotelBooking = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    const booking = await HotelBooking.findOne({ _id: req.params.id, user: userId });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const isRejected = booking.status === "rejected";
    const isDone = booking.payment?.status === "verified" && booking.stay?.checkOut
      ? Date.now() >= new Date(booking.stay.checkOut).getTime()
      : false;
    if (!isRejected && !isDone) {
      return res.status(400).json({
        message: "You can remove only rejected or completed bookings.",
      });
    }

    booking.dismissedByUser = true;
    await booking.save();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

