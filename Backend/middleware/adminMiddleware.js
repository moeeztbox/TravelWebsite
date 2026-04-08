import jwt from "jsonwebtoken";

export const protectAdmin = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "isAdmin") {
      return res.status(403).json({ message: "Admin access only" });
    }
    req.admin = {
      email: decoded.email || decoded.username || "admin@gmail.com",
    };
    next();
  } catch {
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};
