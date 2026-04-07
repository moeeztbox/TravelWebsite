import Story from "../models/story.js";

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

