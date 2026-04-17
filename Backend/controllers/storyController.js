import Story from "../models/story.js";

function baseFromEmail(email) {
  const raw = String(email || "").split("@")[0] || "user";
  const cleaned = raw.toLowerCase().replace(/[^a-z0-9_]/g, "");
  return cleaned || "user";
}

export const createStory = async (req, res) => {
  try {
    const userId = req.user?._id ?? req.user?.id;
    const {
      title,
      type,
      text = "",
      displayName = "",
      username = "",
      location = "",
      rating,
      kind = "story",
    } = req.body || {};

    if (!title || !type) {
      return res.status(400).json({ message: "title and type are required" });
    }
    if (!["hajj", "umrah"].includes(type)) {
      return res.status(400).json({ message: "type must be hajj or umrah" });
    }

    const videoUrl = req.file ? `/uploads/stories/${req.file.filename}` : "";
    const hasText = Boolean(String(text || "").trim());
    const hasVideo = Boolean(videoUrl);
    if (!hasText && !hasVideo) {
      return res
        .status(400)
        .json({ message: "Provide story text or a video." });
    }

    const n = Number(rating);
    if (!Number.isFinite(n) || n < 1 || n > 5) {
      return res.status(400).json({ message: "rating must be between 1 and 5" });
    }

    const base = baseFromEmail(req.user?.email);
    const finalDisplayName = String(displayName || "").trim() || base;
    let finalUsername = String(username || "").trim();
    if (!finalUsername) finalUsername = `@${base}`;
    if (!finalUsername.startsWith("@")) finalUsername = `@${finalUsername}`;
    finalUsername = finalUsername.replace(/\s+/g, "");
    if (!/^@[a-zA-Z0-9_]{3,30}$/.test(finalUsername)) {
      return res.status(400).json({
        message:
          "username must look like @username (3-30 letters/numbers/underscore).",
      });
    }

    const fallbackLocation = [req.user?.city, req.user?.country]
      .filter(Boolean)
      .join(", ")
      .trim();
    const finalLocation = String(location || "").trim() || fallbackLocation;

    const story = await Story.create({
      user: userId,
      title: String(title).trim(),
      displayName: finalDisplayName,
      username: finalUsername,
      type,
      location: finalLocation,
      rating: Math.round(n),
      kind: kind === "review" ? "review" : "story",
      text: String(text || "").trim(),
      videoUrl,
      status: "pending",
    });

    res.status(201).json({ story, message: "Story submitted for review" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const listApprovedStories = async (_req, res) => {
  try {
    const stories = await Story.find({ status: "approved" })
      .populate("user", "firstName lastName")
      .sort({ createdAt: -1 });
    res.json({ stories });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const listMyStories = async (req, res) => {
  try {
    const userId = req.user?._id ?? req.user?.id;
    const stories = await Story.find({ user: userId }).sort({ createdAt: -1 });
    res.json({ stories });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

