

const express = require("express");

const {
  login,
  logout,
  getCurrentUser,
  sendRegistrationOtp,
  verifyRegistrationOtp,
  sendForgotPasswordOtp,
  resetPassword,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Registration with email OTP
router.post("/send-registration-otp", sendRegistrationOtp);

router.post("/verify-registration-otp", verifyRegistrationOtp);

// Login and logout
router.post("/login", login);

router.post("/logout", logout);

// Forgot password
router.post("/send-forgot-password-otp", sendForgotPasswordOtp);

router.post("/reset-password", resetPassword);

// Current user
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;