import express from "express";
import {
  registerUser,
  loginUser,
  loginWithFirebase,
  getMe,
  updateProfile,
  uploadCommonDocuments,
  requestPasswordReset,
  resetPasswordWithToken,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { userDocsUploadFields } from "../middleware/uploadUserDocs.js";
import {
  validateRegister,
  validateLogin,
  validateFirebaseLogin,
  validateForgotPassword,
  validateResetPassword,
} from "../middleware/validateAuth.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.post("/firebase", validateFirebaseLogin, loginWithFirebase);
router.post("/forgot-password", validateForgotPassword, requestPasswordReset);
router.post("/reset-password", validateResetPassword, resetPasswordWithToken);
router.get("/me", protect, getMe);
router.patch("/profile", protect, updateProfile);
router.patch("/documents", protect, userDocsUploadFields(), uploadCommonDocuments);

export default router;
