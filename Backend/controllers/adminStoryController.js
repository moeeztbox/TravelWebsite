import Story from "../models/story.js";

function baseFromEmail(email) {
  const raw = String(email || "").split("@")[0] || "user";
  const cleaned = raw.toLowerCase().replace(/[^a-z0-9_]/g, "");
  return cleaned || "user";
}

function normalizeUsername(raw, fallbackBase) {
  let u = String(raw || "").trim();
  if (!u) u = `@${fallbackBase}`;
  if (!u.startsWith("@")) u = `@${u}`;
  u = u.replace(/\s+/g, "");
  if (!/^@[a-zA-Z0-9_]{3,30}$/.test(u)) {
    return { ok: false, message: "username must look like @username (3-30 letters/numbers/underscore)." };
  }
  return { ok: true, value: u };
}

export const adminListStories = async (req, res) => {
  try {
    const status = (req.query.status || "pending").toString();
    const query = status === "all" ? {} : { status };
    const stories = await Story.find(query)
      .populate("user", "firstName lastName email")
      .sort({ createdAt: -1 });
    res.json({ stories });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const adminSetStoryStatus = async (req, res) => {
  try {
    const { status, rejectionReason = "" } = req.body || {};
    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const set = {
      status,
      rejectionReason:
        status === "rejected" ? String(rejectionReason || "").trim() : "",
    };
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { $set: set },
      { new: true, runValidators: true }
    ).populate("user", "firstName lastName email");
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json({ story });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const adminDeleteStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json({ message: "Deleted", storyId: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Admin: submit a Story (title, text, video) - saved as approved by default.
export const adminCreateStory = async (req, res) => {
  try {
    const userId = req.user?._id ?? req.user?.id;
    const { title, text = "" } = req.body || {};
    if (!title) return res.status(400).json({ message: "title is required" });

    const videoUrl = req.file ? `/uploads/stories/${req.file.filename}` : "";
    const hasText = Boolean(String(text || "").trim());
    const hasVideo = Boolean(videoUrl);
    if (!hasText && !hasVideo) {
      return res.status(400).json({ message: "Provide story text or a video." });
    }

    const story = await Story.create({
      user: userId,
      title: String(title).trim(),
      displayName: "Pilgrim",
      username: "@pilgrim",
      type: "umrah",
      location: "",
      rating: 5,
      kind: "story",
      text: String(text || "").trim(),
      videoUrl,
      status: "approved",
      rejectionReason: "",
    });

    res.status(201).json({ story });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Admin: submit a Review (keep existing fields) - saved as approved by default.
export const adminCreateReview = async (req, res) => {
  try {
    const userId = req.user?._id ?? req.user?.id;
    const {
      title,
      type = "umrah",
      text = "",
      displayName = "",
      username = "",
      location = "",
      rating = 5,
    } = req.body || {};

    if (!title) return res.status(400).json({ message: "title is required" });
    if (!["hajj", "umrah"].includes(type)) {
      return res.status(400).json({ message: "type must be hajj or umrah" });
    }

    const videoUrl = req.file ? `/uploads/stories/${req.file.filename}` : "";
    const hasText = Boolean(String(text || "").trim());
    const hasVideo = Boolean(videoUrl);
    if (!hasText && !hasVideo) {
      return res.status(400).json({ message: "Provide review text or a video." });
    }

    const n = Number(rating);
    if (!Number.isFinite(n) || n < 1 || n > 5) {
      return res.status(400).json({ message: "rating must be between 1 and 5" });
    }

    const base = baseFromEmail(req.user?.email);
    const finalDisplayName = String(displayName || "").trim() || "Pilgrim";
    const normalized = normalizeUsername(username, base);
    if (!normalized.ok) return res.status(400).json({ message: normalized.message });

    const story = await Story.create({
      user: userId,
      title: String(title).trim(),
      displayName: finalDisplayName,
      username: normalized.value,
      type,
      location: String(location || "").trim(),
      rating: Math.round(n),
      kind: "review",
      text: String(text || "").trim(),
      videoUrl,
      status: "approved",
      rejectionReason: "",
    });

    res.status(201).json({ story });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

