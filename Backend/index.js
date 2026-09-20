import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import complainRoutes from "./routes/complainRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

import {
  listPackages,
  adminListAllPackages,
} from "./controllers/packageController.js";
import { sendComplainEmail } from "./controllers/complainController.js";
import { sendContactEmail } from "./controllers/contactController.js";
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
const isProduction = process.env.NODE_ENV === "production";

// Trust the first proxy hop (Render/Railway/Heroku-style single reverse
// proxy) so req.ip reflects the real client IP from X-Forwarded-For instead
// of the proxy's own IP — required for express-rate-limit to key by client
// rather than lumping every user behind the proxy into one bucket. A no-op
// locally, where there's no proxy in front and no X-Forwarded-For header.
app.set("trust proxy", 1);

app.use(helmet());

// 3. CORS setup. In development, ANY http://localhost:<port> or
// http://127.0.0.1:<port> origin is allowed — not just a fixed list of
// ports. Next.js auto-increments its dev port (3000 -> 3001 -> ...)
// whenever the previous one is still occupied (e.g. an old dev server that
// didn't shut down cleanly), which a fixed port list can't keep up with:
// the frontend ends up on a port the backend doesn't recognize, the CORS
// header goes missing, and the browser reports a bare "Network Error" even
// though the backend is perfectly healthy. In production the allowlist is
// still exactly CLIENT_ORIGIN — nothing else is ever allowed.
const localhostOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/;

const corsOrigins = !process.env.CLIENT_ORIGIN
  ? true // unchanged fallback: no CLIENT_ORIGIN configured yet
  : isProduction
    ? [process.env.CLIENT_ORIGIN]
    : (origin, callback) => {
        if (!origin) return callback(null, true); // curl, health checks, server-to-server
        if (origin === process.env.CLIENT_ORIGIN) return callback(null, true);
        if (localhostOriginPattern.test(origin)) return callback(null, true);
        return callback(null, false);
      };

if (isProduction && process.env.CLIENT_ORIGIN && !process.env.CLIENT_ORIGIN.startsWith("https://")) {
  console.warn(
    `WARNING: CLIENT_ORIGIN is "${process.env.CLIENT_ORIGIN}" in production but does not start with https:// — CORS will allow an insecure origin.`,
  );
}

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  }),
);

app.use(express.json());
app.use(morgan("dev"));

// General API rate limit — a generous ceiling that only kicks in against
// abusive/automated traffic, not real users.
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

// Stricter limit on login to slow down credential brute-forcing.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts. Please try again later." },
});

// 4. Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Lightweight liveness/readiness check for deployment monitoring — no
// secrets, just process + DB connection state.
app.get("/health", (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  res.status(dbConnected ? 200 : 503).json({
    status: dbConnected ? "ok" : "degraded",
    db: dbConnected ? "connected" : "disconnected",
    uptime: process.uptime(),
  });
});

app.use("/api/auth", loginLimiter, authRoutes);

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

// Reviews
app.use("/api/reviews", reviewRoutes);

// 5. Unknown /api/* routes -> JSON 404 (instead of Express's default HTML page)
app.use("/api", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

// 6. Centralized error handler — controllers that call next(err) (or async
// errors Express 5 forwards automatically) land here instead of Express's
// default HTML error page, and stack traces never leave the server.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || err.status || 500;
  // Client (4xx) messages are intentional and safe to show; 500s only leak
  // their raw message outside production, where it's useful for debugging.
  const exposeMessage = status < 500 || !isProduction;
  res.status(status).json({
    message: exposeMessage && err.message ? err.message : "Something went wrong",
  });
});

// 7. CONNECT DB + START SERVER (MOST IMPORTANT FIX)
// Awaited so the server never reports "running" (or accepts requests that
// would otherwise hang waiting on Mongoose's connection buffer) before the
// database is actually reachable.
const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
