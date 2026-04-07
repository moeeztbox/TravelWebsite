import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, "../uploads/stories");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase() || ".mp4";
    const safeExt = [".mp4", ".webm", ".mov"].includes(ext) ? ext : ".mp4";
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`);
  },
});

const videoOnly = (_req, file, cb) => {
  const ok =
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/webm" ||
    file.mimetype === "video/quicktime";
  if (!ok) return cb(new Error("Only video files are allowed (mp4, webm, mov)"));
  return cb(null, true);
};

export const uploadStoryVideo = multer({
  storage,
  fileFilter: videoOnly,
  limits: { fileSize: 60 * 1024 * 1024 }, // 60MB
});

