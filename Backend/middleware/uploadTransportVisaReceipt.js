import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, "../uploads/misc-receipts");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, _file, cb) => {
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}.pdf`);
  },
});

const pdfOnly = (_req, file, cb) => {
  if (file.mimetype !== "application/pdf") {
    cb(new Error("Only PDF files are allowed"));
    return;
  }
  cb(null, true);
};

export const uploadMiscReceipt = multer({
  storage,
  fileFilter: pdfOnly,
  limits: { fileSize: 8 * 1024 * 1024 },
});

export function miscReceiptSingle() {
  return uploadMiscReceipt.single("receiptPdf");
}
