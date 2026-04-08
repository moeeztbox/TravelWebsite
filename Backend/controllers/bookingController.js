import Booking from "../models/booking.js";

export const createDraftBooking = async (req, res) => {
  try {
    const {
      packageId,
      packageTitle,
      packageSubtitle = "",
      packagePrice = "",
      packageDuration = "",
      packageImage = "",
      badge = "",
    } = req.body;

    if (!packageId || !packageTitle) {
      return res.status(400).json({ message: "packageId and packageTitle are required" });
    }

    const userId = req.user._id ?? req.user.id;

    const existing = await Booking.findOne({
      user: userId,
      packageId,
      status: "pending",
    });

    if (existing) {
      return res.status(200).json({
        message: "This package is already in your draft bookings",
        booking: existing,
      });
    }

    const booking = await Booking.create({
      user: userId,
      packageId,
      packageTitle,
      packageSubtitle,
      packagePrice,
      packageDuration,
      packageImage,
      badge,
      status: "pending",
    });

    res.status(201).json({
      message: "Booking saved as draft (pending approval)",
      booking,
    });
  } catch (error) {
    console.error("createDraftBooking:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const listMyBookings = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    const bookings = await Booking.find({ user: userId }).sort({
      updatedAt: -1,
    });
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: userId,
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ booking });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const deleteMyBooking = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: userId,
    });
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
    res.status(500).json({ message: error.message || "Server error" });
  }
};
