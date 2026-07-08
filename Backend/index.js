import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import complainRoutes from "./routes/complainRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";

import {
  listPackages,
  adminListAllPackages,
} from "./controllers/packageController.js";
import { sendComplainEmail } from "./controllers/complainController.js";
import { sendContactEmail } from "./controllers/contactController.js";
import { adminLogin } from "./controllers/adminController.js";
import { protectAdmin } from "./middleware/adminMiddleware.js";

// 1. Load env FIRST
dotenv.config();

// 2. Check JWT
if (!process.env.JWT_SECRET) {
  console.error(
    "FATAL: JWT_SECRET is missing. Add it to Backend/.env (required for login & bookings).",
  );
  process.exit(1);
}

const app = express();

// 3. CORS setup
const corsOrigins = process.env.CLIENT_ORIGIN
  ? [
      process.env.CLIENT_ORIGIN,
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
  "http://127.0.0.1:5174",
    ]
  : true;

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  }),
);

app.use(express.json());
app.use(morgan("dev"));

// 4. Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);

// Admin login
app.post("/api/admin/login", adminLogin);

// Packages
app.get("/api/packages", listPackages);
app.get("/api/admin/packages", protectAdmin, adminListAllPackages);
app.use("/api/packages", packageRoutes);

// Complain
app.post("/api/complain", sendComplainEmail);
app.use("/api/complain", complainRoutes);

// Contact
app.post("/api/contact", sendContactEmail);
app.use("/api/contact", contactRoutes);

// Newsletter
app.use("/api/newsletter", newsletterRoutes);

// 5. CONNECT DB + START SERVER (MOST IMPORTANT FIX)
const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
