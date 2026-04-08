import Story from "../models/story.js";

export const createStory = async (req, res) => {
  try {
    const userId = req.user?._id ?? req.user?.id;
    const { title, type, text = "" } = req.body || {};

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

    const story = await Story.create({
      user: userId,
      title: String(title).trim(),
      type,
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

