import nodemailer from "nodemailer";
import NewsletterSubscriber from "../models/newsletterSubscriber.js";

function normalizeEmail(raw) {
  const email = String(raw || "").trim().toLowerCase();
  return email;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
}

function createTransporterOrThrow() {
  const MAIL_USER = String(process.env.MAIL_USER || "").trim();
  const MAIL_PASS = String(process.env.MAIL_PASS || "").trim();
  if (!MAIL_USER || !MAIL_PASS) {
    const err = new Error(
      "Email service is not configured. Add MAIL_USER and MAIL_PASS in Backend/.env"
    );
    err.statusCode = 500;
    throw err;
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: MAIL_USER, pass: MAIL_PASS },
  });
}

export async function newsletterStatus(req, res, next) {
  try {
    const email = normalizeEmail(req.query?.email);
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }
    const doc = await NewsletterSubscriber.findOne({ email }).lean();
    res.json({ email, subscribed: doc?.status === "subscribed" });
  } catch (err) {
    next(err);
  }
}

export async function subscribeNewsletter(req, res, next) {
  try {
    const email = normalizeEmail(req.body?.email);
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }

    const now = new Date();
    let doc = await NewsletterSubscriber.findOne({ email });
    const wasSubscribed = doc?.status === "subscribed";

    if (!doc) {
      doc = await NewsletterSubscriber.create({
        email,
        status: "subscribed",
        subscribedAt: now,
        unsubscribedAt: null,
      });
    } else if (doc.status !== "subscribed") {
      doc.status = "subscribed";
      doc.subscribedAt = now;
      doc.unsubscribedAt = null;
      await doc.save();
    }

    if (!wasSubscribed) {
      const transporter = createTransporterOrThrow();
      const MAIL_USER = String(process.env.MAIL_USER || "").trim();
      await transporter.sendMail({
        from: MAIL_USER,
        to: "moeezjamil868@gmail.com",
        subject: "New newsletter subscription",
        text: `A user subscribed to your newsletter.\n\nEmail: ${email}\nTime: ${now.toISOString()}\n`,
      });
    }

    res.json({
      email,
      subscribed: true,
      alreadySubscribed: Boolean(wasSubscribed),
    });
  } catch (err) {
    // handle race on unique index
    if (String(err?.code) === "11000") {
      try {
        const email = normalizeEmail(req.body?.email);
        const doc = await NewsletterSubscriber.findOne({ email }).lean();
        return res.json({
          email,
          subscribed: doc?.status === "subscribed",
          alreadySubscribed: doc?.status === "subscribed",
        });
      } catch (e2) {
        return next(e2);
      }
    }
    next(err);
  }
}

export async function unsubscribeNewsletter(req, res, next) {
  try {
    const email = normalizeEmail(req.body?.email);
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }
    const now = new Date();
    const doc = await NewsletterSubscriber.findOne({ email });
    if (!doc) {
      return res.json({ email, subscribed: false, alreadyUnsubscribed: true });
    }
    if (doc.status === "unsubscribed") {
      return res.json({ email, subscribed: false, alreadyUnsubscribed: true });
    }
    doc.status = "unsubscribed";
    doc.unsubscribedAt = now;
    await doc.save();
    res.json({ email, subscribed: false, alreadyUnsubscribed: false });
  } catch (err) {
    next(err);
  }
}

