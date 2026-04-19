import Package from "../models/packageModel.js";

export const listPackages = async (req, res) => {
  try {
    const packages = await Package.find({
      $or: [{ active: true }, { active: { $exists: false } }],
    }).sort({ order: 1 });
    res.json({ packages });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const adminListAllPackages = async (req, res) => {
  try {
    const packages = await Package.find({}).sort({ order: 1 });
    res.json({ packages });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const getPackageBySlug = async (req, res) => {
  try {
    const pkg = await Package.findOne({
      packageId: req.params.packageId,
      $or: [{ active: true }, { active: { $exists: false } }],
    });
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json({ package: pkg });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const createPackage = async (req, res) => {
  try {
    const {
      packageId,
      order = 0,
      title,
      subtitle = "",
      price = "",
      duration = "",
      badge = "",
      image = "",
      highlights = [],
      services = {},
      journeyStages = [],
      active = true,
      featured = false,
    } = req.body;

    if (!packageId || !title) {
      return res
        .status(400)
        .json({ message: "packageId and title are required" });
    }

    const exists = await Package.findOne({ packageId });
    if (exists) {
      return res.status(400).json({ message: "packageId already exists" });
    }

    const pkg = await Package.create({
      packageId,
      order,
      title,
      subtitle,
      price,
      duration,
      badge,
      image,
      highlights,
      services: {
        ziyarat: Boolean(services?.ziyarat),
        transport: Boolean(services?.transport),
        visa: Boolean(services?.visa),
        ticket: Boolean(services?.ticket),
        hotel: Boolean(services?.hotel),
      },
      journeyStages: Array.isArray(journeyStages)
        ? journeyStages
            .map((s) => String(s || "").trim())
            .filter(Boolean)
        : [],
      active,
      featured: Boolean(featured),
    });

    res.status(201).json({ package: pkg });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const updatePackage = async (req, res) => {
  try {
    const body = { ...(req.body || {}) };
    if (body.services && typeof body.services === "object") {
      body.services = {
        ziyarat: Boolean(body.services?.ziyarat),
        transport: Boolean(body.services?.transport),
        visa: Boolean(body.services?.visa),
        ticket: Boolean(body.services?.ticket),
        hotel: Boolean(body.services?.hotel),
      };
    }
    if (body.featured !== undefined) {
      body.featured = Boolean(body.featured);
    }
    if (body.journeyStages !== undefined) {
      body.journeyStages = Array.isArray(body.journeyStages)
        ? body.journeyStages
            .map((s) => String(s || "").trim())
            .filter(Boolean)
        : [];
    }
    const pkg = await Package.findOneAndUpdate(
      { packageId: req.params.packageId },
      { $set: body },
      { new: true, runValidators: true }
    );
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json({ package: pkg });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findOneAndDelete({
      packageId: req.params.packageId,
    });
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json({ message: "Package removed", package: pkg });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};
