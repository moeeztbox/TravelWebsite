import nodemailer from "nodemailer";

const normalizeType = (t) => {
  const v = String(t || "").trim().toLowerCase();
  if (v === "complain" || v === "complaint") return "complaint";
  if (v === "inquiry" || v === "enquiry") return "inquiry";
  return "";
};

export const sendContactEmail = async (req, res, next) => {
  try {
    const { type, userEmail, userName } = req.body || {};
    const message =
      req.body?.message ?? req.body?.complaint ?? req.body?.inquiry ?? "";

    const normalizedType = normalizeType(type);
    if (!normalizedType) {
      return res.status(400).json({
        message: "type must be either 'complain'/'complaint' or 'inquiry'",
      });
    }

    if (!userEmail || !String(message || "").trim()) {
      return res.status(400).json({
        message: "userEmail and message are required",
      });
    }

    const MAIL_USER = String(process.env.MAIL_USER || "").trim();
    const MAIL_PASS = String(process.env.MAIL_PASS || "").trim();
    if (!MAIL_USER || !MAIL_PASS) {
      return res.status(500).json({
        message:
          "Email service is not configured. Add MAIL_USER and MAIL_PASS in Backend/.env",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: MAIL_USER, pass: MAIL_PASS },
    });

    const safeName = String(userName || "User").trim() || "User";
    const subjectPrefix = normalizedType === "inquiry" ? "Inquiry" : "Complaint";

    await transporter.sendMail({
      from: userEmail,
      sender: MAIL_USER,
      to: "moeezjamil868@gmail.com",
      replyTo: userEmail,
      subject: `${subjectPrefix} From ${safeName}`,
      text: `From: ${userEmail}\nName: ${safeName}\nType: ${normalizedType}\n\nMessage:\n${String(
        message
      )}\n`,
    });

    res.json({ message: `${subjectPrefix} email sent` });
  } catch (err) {
    next(err);
  }
};

