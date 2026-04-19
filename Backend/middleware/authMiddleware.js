import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  let token;
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) {
    token = auth.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const uid = decoded.userId || decoded.id;
    const user = await User.findById(uid).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
