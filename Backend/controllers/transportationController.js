import TransportationOption from "../models/transportationOption.js";
import TransportationBooking from "../models/transportationBooking.js";

function parsePickupAt(pickupDate, pickupTime) {
  if (!pickupDate) return null;
  const t = (pickupTime || "12:00").trim();
  const iso = t.length === 5 ? `${pickupDate}T${t}:00` : `${pickupDate}T${t}`;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

function computeEndAt(pickupAt, tripType) {
  if (!pickupAt) return null;
  if (tripType === "round") {
    const d = new Date(pickupAt);
    d.setDate(d.getDate() + 1);
    d.setHours(23, 59, 59, 999);
    return d;
  }
  const end = new Date(pickupAt);
  end.setHours(23, 59, 59, 999);
  return end;
}

export const listTransportationOptions = async (_req, res) => {
  try {
    const options = await TransportationOption.find({ active: true }).sort({
      priceAmount: 1,
    });
    res.json({ options });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const createTransportationBooking = async (req, res) => {
  try {
    const { selectedOption, form } = req.body || {};
    if (!selectedOption?.optionId || !selectedOption?.title) {
      return res.status(400).json({ message: "selectedOption is required" });
    }
    if (!form?.serviceType || !form?.vehicleType || !form?.pickupDate) {
      return res.status(400).json({ message: "Incomplete transportation form" });
    }

    const opt = await TransportationOption.findOne({
      key: String(selectedOption.optionId),
    });
    if (!opt) {
      return res.status(400).json({ message: "Invalid transportation option" });
    }

    const userId = req.user._id ?? req.user.id;
    const pickupAt = parsePickupAt(form.pickupDate, form.pickupTime);
    const endAt = computeEndAt(pickupAt, form.tripType);
    const pax = Math.max(1, Number(form.passengers) || 1);
    const perPax = Number(opt.priceAmount) || 0;
    const totalPkr = Math.round(perPax * pax);
    const priceLabel = `PKR ${totalPkr.toLocaleString()} (${pax} pax × PKR ${perPax.toLocaleString()})`;

    const booking = await TransportationBooking.create({
      user: userId,
      status: "pending",
      selectedOption: {
        optionId: String(selectedOption.optionId),
        title: opt.title || selectedOption.title,
        description: opt.description || selectedOption.description || "",
        priceLabel,
        priceAmount: totalPkr,
        pricePerPassenger: perPax,
        passengerCount: pax,
      },
      form: {
        serviceType: form.serviceType,
        vehicleType: form.vehicleType,
        tripType: form.tripType || "",
        pickup: form.pickup || "",
        dropoff: form.dropoff || "",
        pickupDate: form.pickupDate,
        pickupTime: form.pickupTime || "",
        passengers: pax,
        extras: form.extras || {},
      },
      pickupAt: pickupAt || undefined,
      endAt: endAt || undefined,
    });

    res.status(201).json({ booking });
  } catch (e) {
    console.error("createTransportationBooking:", e);
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const listMyTransportationBookings = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    const bookings = await TransportationBooking.find({
      user: userId,
      dismissedByUser: false,
    }).sort({ updatedAt: -1 });
    res.json({ bookings });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const setMyTransportPaymentMethod = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    const { method } = req.body || {};
    const allowed = ["", "jazzcash", "easypaisa", "bank_transfer", "stripe"];
    const next = String(method || "").trim();
    if (!allowed.includes(next)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    const booking = await TransportationBooking.findOne({
      _id: req.params.id,
      user: userId,
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.status !== "approved") {
      return res.status(400).json({ message: "Wait for admin approval first." });
    }
    if (booking.payment?.status === "verified") {
      return res.status(400).json({ message: "Payment already verified." });
    }

    booking.payment = {
      ...(booking.payment?.toObject
        ? booking.payment.toObject()
        : booking.payment),
      method: next,
    };
    await booking.save();
    res.json({ booking });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const attachTransportPaymentReceipt = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    if (!req.file?.filename) {
      return res.status(400).json({ message: "receiptPdf PDF required" });
    }

    const booking = await TransportationBooking.findOne({
      _id: req.params.id,
      user: userId,
    });
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
      ...(booking.payment?.toObject
        ? booking.payment.toObject()
        : booking.payment),
      receiptPdf: req.file.filename,
      status: "verifying",
    };
    await booking.save();
    res.json({ booking });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const dismissTransportationBooking = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    const booking = await TransportationBooking.findOne({
      _id: req.params.id,
      user: userId,
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.status === "rejected") {
      booking.dismissedByUser = true;
      await booking.save();
      return res.json({ message: "Removed", booking });
    }

    if (booking.payment?.status !== "verified") {
      return res.status(400).json({
        message: "Only completed or rejected requests can be removed.",
      });
    }

    const end = booking.endAt || booking.pickupAt;
    if (!end || Date.now() < new Date(end).getTime()) {
      return res.status(400).json({
        message: "You can remove this after the scheduled service date has passed.",
      });
    }

    booking.dismissedByUser = true;
    await booking.save();
    res.json({ message: "Removed", booking });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};
