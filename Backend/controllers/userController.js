import jwt from "jsonwebtoken";

const signAdminToken = (email) =>
  jwt.sign({ role: "isAdmin", email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const emailMatches =
      adminEmail && email.trim().toLowerCase() === adminEmail.toLowerCase();
    const passwordMatches = adminPassword && password === adminPassword;

    if (!emailMatches || !passwordMatches) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signAdminToken(adminEmail);

    res.json({
      message: "Login successful",
      token,
      user: { email: adminEmail, role: "isAdmin" },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};
