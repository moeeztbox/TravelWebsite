import jwt from "jsonwebtoken";

export const adminLogin = (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const expectedEmail = (
    process.env.ADMIN_EMAIL ?? "admin@gmail.com"
  ).toLowerCase();
  const expectedPass = process.env.ADMIN_PASSWORD ?? "admin123";

  if (email.trim().toLowerCase() !== expectedEmail || password !== expectedPass) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { role: "admin", email: expectedEmail },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({
    token,
    admin: { email: expectedEmail },
  });
};
