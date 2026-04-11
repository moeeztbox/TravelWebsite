import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  requestPasswordReset,
  resetPasswordWithToken,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
} from "../middleware/validateAuth.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.post("/forgot-password", validateForgotPassword, requestPasswordReset);
router.post("/reset-password", validateResetPassword, resetPasswordWithToken);
router.get("/me", protect, getMe);
router.patch("/profile", protect, updateProfile);

export default router;
