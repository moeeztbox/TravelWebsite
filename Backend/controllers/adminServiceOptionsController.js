import mongoose from "mongoose";
import TransportationOption from "../models/transportationOption.js";
import VisaOption from "../models/visaOption.js";

function toStrArr(val) {
  if (Array.isArray(val)) {
    return val.map((s) => String(s).trim()).filter(Boolean);
  }
  if (typeof val === "string") {
    return val
      .split(/[,;\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function badId(res) {
  return res.status(400).json({ message: "Invalid id" });
}

/** --- Transportation options (admin: all rows) --- */

export const adminListTransportationOptions = async (_req, res) => {
  try {
    const options = await TransportationOption.find({}).sort({ key: 1 });
    res.json({ options });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const adminCreateTransportationOption = async (req, res) => {
  try {
    const {
      key,
      title,
      description = "",
      priceLabel = "",
      priceAmount = 0,
      serviceTypes,
      vehicleTypes,
      tripTypes,
      passengerType = "any",
      active = true,
    } = req.body;

    const k = String(key || "").trim();
    const t = String(title || "").trim();
    if (!k || !t) {
      return res.status(400).json({ message: "key and title are required" });
    }

    const exists = await TransportationOption.findOne({ key: k });
    if (exists) {
      return res.status(400).json({ message: "This key is already in use" });
    }

    const option = await TransportationOption.create({
      key: k,
      title: t,
      description: String(description ?? ""),
      priceLabel: String(priceLabel ?? ""),
      priceAmount: Number(priceAmount) || 0,
      serviceTypes: toStrArr(serviceTypes),
      vehicleTypes: toStrArr(vehicleTypes),
      tripTypes: toStrArr(tripTypes),
      passengerType:
        passengerType === "adult" || passengerType === "child" || passengerType === "infant"
          ? passengerType
          : "any",
      active: active !== false,
    });

    res.status(201).json({ option });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const adminUpdateTransportationOption = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return badId(res);

    const existing = await TransportationOption.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Option not found" });
    }

    const body = req.body || {};
    const patch = {};

    if (body.key !== undefined) {
      const k = String(body.key).trim();
      if (!k) {
        return res.status(400).json({ message: "key cannot be empty" });
      }
      if (k !== existing.key) {
        const clash = await TransportationOption.findOne({ key: k });
        if (clash) {
          return res.status(400).json({ message: "This key is already in use" });
        }
      }
      patch.key = k;
    }
    if (body.title !== undefined) {
      patch.title = String(body.title).trim();
    }
    if (body.description !== undefined) patch.description = String(body.description);
    if (body.priceLabel !== undefined) patch.priceLabel = String(body.priceLabel);
    if (body.priceAmount !== undefined) patch.priceAmount = Number(body.priceAmount) || 0;
    if (body.serviceTypes !== undefined) patch.serviceTypes = toStrArr(body.serviceTypes);
    if (body.vehicleTypes !== undefined) patch.vehicleTypes = toStrArr(body.vehicleTypes);
    if (body.tripTypes !== undefined) patch.tripTypes = toStrArr(body.tripTypes);
    if (body.passengerType !== undefined) {
      patch.passengerType =
        body.passengerType === "adult" ||
        body.passengerType === "child" ||
        body.passengerType === "infant"
          ? body.passengerType
          : "any";
    }
    if (body.active !== undefined) patch.active = Boolean(body.active);

    const mergedTitle =
      patch.title !== undefined ? patch.title : existing.title;
    if (!mergedTitle?.trim()) {
      return res.status(400).json({ message: "title cannot be empty" });
    }

    const option = await TransportationOption.findByIdAndUpdate(id, patch, {
      new: true,
      runValidators: true,
    });

    res.json({ option });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const adminDeleteTransportationOption = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return badId(res);

    const removed = await TransportationOption.findByIdAndDelete(id);
    if (!removed) {
      return res.status(404).json({ message: "Option not found" });
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

/** --- Visa options (admin: all rows) --- */

export const adminListVisaOptions = async (_req, res) => {
  try {
    const options = await VisaOption.find({}).sort({ key: 1 });
    res.json({ options });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const adminCreateVisaOption = async (req, res) => {
  try {
    const {
      key,
      title,
      description = "",
      priceLabel = "",
      priceAmount = 0,
      tier = "standard",
      visaTypes,
      nationalities,
      durationMinDays,
      durationMaxDays,
      massar = "any",
      passengerType = "any",
      active = true,
    } = req.body;

    const k = String(key || "").trim();
    const t = String(title || "").trim();
    if (!k || !t) {
      return res.status(400).json({ message: "key and title are required" });
    }

    const tierOk = tier === "premium" ? "premium" : "standard";
    const exists = await VisaOption.findOne({ key: k });
    if (exists) {
      return res.status(400).json({ message: "This key is already in use" });
    }

    const option = await VisaOption.create({
      key: k,
      title: t,
      description: String(description ?? ""),
      priceLabel: String(priceLabel ?? ""),
      priceAmount: Number(priceAmount) || 0,
      tier: tierOk,
      visaTypes: toStrArr(visaTypes),
      nationalities: toStrArr(nationalities),
      durationMinDays:
        durationMinDays !== undefined && durationMinDays !== null && durationMinDays !== ""
          ? Number(durationMinDays) || 0
          : undefined,
      durationMaxDays:
        durationMaxDays !== undefined && durationMaxDays !== null && durationMaxDays !== ""
          ? Number(durationMaxDays) || 0
          : undefined,
      massar: massar === "with" || massar === "without" ? massar : "any",
      passengerType:
        passengerType === "adult" || passengerType === "child" || passengerType === "infant"
          ? passengerType
          : "any",
      active: active !== false,
    });

    res.status(201).json({ option });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const adminUpdateVisaOption = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return badId(res);

    const existing = await VisaOption.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Option not found" });
    }

    const body = req.body || {};
    const patch = {};

    if (body.key !== undefined) {
      const k = String(body.key).trim();
      if (!k) {
        return res.status(400).json({ message: "key cannot be empty" });
      }
      if (k !== existing.key) {
        const clash = await VisaOption.findOne({ key: k });
        if (clash) {
          return res.status(400).json({ message: "This key is already in use" });
        }
      }
      patch.key = k;
    }
    if (body.title !== undefined) {
      patch.title = String(body.title).trim();
    }
    if (body.description !== undefined) patch.description = String(body.description);
    if (body.priceLabel !== undefined) patch.priceLabel = String(body.priceLabel);
    if (body.priceAmount !== undefined) patch.priceAmount = Number(body.priceAmount) || 0;
    if (body.tier !== undefined) {
      patch.tier = body.tier === "premium" ? "premium" : "standard";
    }
    if (body.visaTypes !== undefined) patch.visaTypes = toStrArr(body.visaTypes);
    if (body.nationalities !== undefined) patch.nationalities = toStrArr(body.nationalities);
    if (body.durationMinDays !== undefined) {
      patch.durationMinDays =
        body.durationMinDays === "" || body.durationMinDays === null
          ? undefined
          : Number(body.durationMinDays) || 0;
    }
    if (body.durationMaxDays !== undefined) {
      patch.durationMaxDays =
        body.durationMaxDays === "" || body.durationMaxDays === null
          ? undefined
          : Number(body.durationMaxDays) || 0;
    }
    if (body.massar !== undefined) {
      patch.massar = body.massar === "with" || body.massar === "without" ? body.massar : "any";
    }
    if (body.passengerType !== undefined) {
      patch.passengerType =
        body.passengerType === "adult" ||
        body.passengerType === "child" ||
        body.passengerType === "infant"
          ? body.passengerType
          : "any";
    }
    if (body.active !== undefined) patch.active = Boolean(body.active);

    const mergedTitle =
      patch.title !== undefined ? patch.title : existing.title;
    if (!mergedTitle?.trim()) {
      return res.status(400).json({ message: "title cannot be empty" });
    }

    const option = await VisaOption.findByIdAndUpdate(id, patch, {
      new: true,
      runValidators: true,
    });

    res.json({ option });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const adminDeleteVisaOption = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return badId(res);

    const removed = await VisaOption.findByIdAndDelete(id);
    if (!removed) {
      return res.status(404).json({ message: "Option not found" });
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};
