import Review from "../models/reviewModel.js";

const RESUBMIT_COOLDOWN_DAYS = 30;
const RESUBMIT_COOLDOWN_MS = RESUBMIT_COOLDOWN_DAYS * 24 * 60 * 60 * 1000;

export const submitReview = async (req, res) => {
  try {
    const { fullName, email, phone, review, rating } = req.body || {};

    if (!fullName || !String(fullName).trim()) {
      return res.status(400).json({ message: "Full name is required" });
    }
    if (!email || !String(email).trim()) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!phone || !String(phone).trim()) {
      return res.status(400).json({ message: "Phone number is required" });
    }
    if (!review || !String(review).trim()) {
      return res.status(400).json({ message: "Review is required" });
    }

    const ratingNum = Number(rating);
    if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const lastReview = await Review.findOne({ email: normalizedEmail }).sort({
      createdAt: -1,
    });
    if (lastReview) {
      const elapsedMs = Date.now() - new Date(lastReview.createdAt).getTime();
      if (elapsedMs < RESUBMIT_COOLDOWN_MS) {
        const nextEligible = new Date(
          new Date(lastReview.createdAt).getTime() + RESUBMIT_COOLDOWN_MS
        );
        const daysLeft = Math.max(
          1,
          Math.ceil((RESUBMIT_COOLDOWN_MS - elapsedMs) / (24 * 60 * 60 * 1000))
        );
        return res.status(409).json({
          message: `You already submitted a review with this email. You can submit another review in ${daysLeft} day${
            daysLeft !== 1 ? "s" : ""
          } (on ${nextEligible.toDateString()}).`,
        });
      }
    }

    const doc = await Review.create({
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      review: String(review).trim(),
      rating: ratingNum,
      status: "Pending",
    });

    res.status(201).json({
      message: "Review submitted. It will appear once approved by admin.",
      review: doc,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: "Approved" }).sort({
      rating: -1,
      createdAt: -1,
    });
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const adminListReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const adminSetReviewStatus = async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!["Approved", "Rejected"].includes(status)) {
      return res
        .status(400)
        .json({ message: "status must be 'Approved' or 'Rejected'" });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ review });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const adminDeleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted", review });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};
