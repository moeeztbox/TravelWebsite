import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import complainRoutes from "./routes/complainRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import customPackageRoutes from "./routes/customPackageRoutes.js";
import adminCustomPackageRoutes from "./routes/adminCustomPackageRoutes.js";
import { listPackages } from "./controllers/packageController.js";
import { adminListAllPackages } from "./controllers/packageController.js";
import { sendComplainEmail } from "./controllers/complainController.js";
import { sendContactEmail } from "./controllers/contactController.js";
import {
  createCustomPackageRequest,
  listMyCustomPackageRequests,
  acceptApprovedCustomPackage,
  rejectUserCustomPackageProposal,
  deleteMyCustomPackageRequest,
} from "./controllers/customPackageController.js";
import { adminLogin } from "./controllers/adminController.js";
import { protectAdmin } from "./middleware/adminMiddleware.js";
import {
  listAllBookings,
  setBookingStatus,
  setPaymentStatus,
  scheduleJourney,
  setJourneyStage,
  adminDeleteBooking,
} from "./controllers/adminBookingController.js";
import { seedPackagesIfEnabled } from "./seed/packagesSeed.js";
import { seedAdminUserOnStart } from "./seed/adminSeed.js";
import { protect } from "./middleware/authMiddleware.js";
import { uploadStoryVideo } from "./middleware/uploadStoryVideo.js";
import {
  createStory,
  listApprovedStories,
  listMyStories,
} from "./controllers/storyController.js";
import {
  adminListStories,
  adminSetStoryStatus,
} from "./controllers/adminStoryController.js";
import {
  adminListCustomPackageRequests,
  adminUpdateCustomPackageRequest,
  adminDeleteCustomPackageRequest,
} from "./controllers/adminCustomPackageController.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Always load Backend/.env even if you run `node Backend/index.js` from the repo root
dotenv.config({ path: path.join(__dirname, ".env") });

if (!process.env.JWT_SECRET) {
  console.error(
    "FATAL: JWT_SECRET is missing. Add it to Backend/.env (required for login & bookings)."
  );
  process.exit(1);
}

const app = express();

const corsOrigins = process.env.CLIENT_ORIGIN
  ? [
      process.env.CLIENT_ORIGIN,
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ]
  : true;

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
// Express 5: mounted Router can fail to match POST /login → 404; register explicitly.
app.post("/api/admin/login", adminLogin);
// Admin bookings management
app.get("/api/admin/bookings", protectAdmin, listAllBookings);
app.patch("/api/admin/bookings/:id", protectAdmin, setBookingStatus);
app.delete("/api/admin/bookings/:id", protectAdmin, adminDeleteBooking);
app.patch("/api/admin/bookings/:id/payment", protectAdmin, setPaymentStatus);
app.patch("/api/admin/bookings/:id/journey", protectAdmin, scheduleJourney);
app.patch("/api/admin/bookings/:id/journey-stage", protectAdmin, setJourneyStage);
// Admin custom packages
app.get(
  "/api/admin/custom-packages",
  protectAdmin,
  adminListCustomPackageRequests
);
app.patch(
  "/api/admin/custom-packages/:id",
  protectAdmin,
  adminUpdateCustomPackageRequest
);
app.delete(
  "/api/admin/custom-packages/:id",
  protectAdmin,
  adminDeleteCustomPackageRequest
);
app.use("/api/admin/custom-packages", adminCustomPackageRoutes);
// Must be registered before the mounted router: Express 5 often does not match router.get("/") for GET /api/packages → 404 without this line.
app.get("/api/packages", listPackages);
// Admin package listing (includes inactive)
app.get("/api/admin/packages", protectAdmin, adminListAllPackages);
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);
// Custom package requests (user)
app.post("/api/custom-packages", protect, createCustomPackageRequest);
app.get("/api/custom-packages/me", protect, listMyCustomPackageRequests);
app.post("/api/custom-packages/:id/accept", protect, acceptApprovedCustomPackage);
app.post(
  "/api/custom-packages/:id/reject-offer",
  protect,
  rejectUserCustomPackageProposal
);
app.delete("/api/custom-packages/:id", protect, deleteMyCustomPackageRequest);
app.use("/api/custom-packages", customPackageRoutes);
// Express 5: mounted Router can fail to match POST / → 404; register explicitly.
app.post("/api/complain", sendComplainEmail);
app.use("/api/complain", complainRoutes);

// Contact (complaint + inquiry) - shared nodemailer logic
app.post("/api/contact", sendContactEmail);
app.use("/api/contact", contactRoutes);

// Stories (public + user)
app.get("/api/stories", listApprovedStories);
app.get("/api/stories/me", protect, listMyStories);
app.post("/api/stories", protect, uploadStoryVideo.single("video"), createStory);

// Admin stories moderation
app.get("/api/admin/stories", protectAdmin, adminListStories);
app.patch("/api/admin/stories/:id", protectAdmin, adminSetStoryStatus);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === "MulterError") {
    return res.status(400).json({ message: err.message || "Upload failed" });
  }
  if (err.message === "Only PDF files are allowed") {
    return res.status(400).json({ message: err.message });
  }
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    seedPackagesIfEnabled().catch((e) =>
      console.error("Package seeding failed:", e)
    );
    seedAdminUserOnStart().catch((e) =>
      console.error("Admin seeding failed:", e)
    );
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
