import bcrypt from "bcryptjs";
import User from "../models/user.js";

export async function seedAdminUserOnStart() {
  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = String(process.env.ADMIN_PASSWORD || "").trim();

  if (!email || !password) {
    console.log(
      "Admin seed: skipped (ADMIN_EMAIL / ADMIN_PASSWORD not set in Backend/.env)."
    );
    return;
  }

  const existing = await User.findOne({ email }).lean();
  if (existing) {
    console.log("Admin seed: already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    firstName: "Admin",
    lastName: "User",
    email,
    password: hashedPassword,
    role: "isAdmin",
    address: "",
    country: "",
    city: "",
  });

  console.log("Admin seed: created.");
}

