const argon2 = require("argon2");
const User = require("../models/User");
const EmailVerification = require("../models/EmailVerification");
const { sendOtpEmail } = require("../utils/emailService");

const {
  OTP_EXPIRY_MS,
  generateOtp,
  hashOtp,
  verifyOtp,
} = require("../utils/otp");

// ============================================================
// LOGIN
// ============================================================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const passwordValid = await argon2.verify(
      user.passwordHash,
      password
    );

    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    req.session.userId = user._id.toString();

    res.json({
      success: true,
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// LOGOUT
// ============================================================

const logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Logout error:", error);

      return res.status(500).json({
        success: false,
        message: "Logout failed.",
      });
    }

    res.clearCookie("resider.sid", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
    });

    res.json({
      success: true,
      message: "Logout successful.",
    });
  });
};

// ============================================================
// GET CURRENT USER
// ============================================================

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select(
      "-passwordHash"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Current user error:", error);

    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// SEND REGISTRATION OTP
// ============================================================

const sendRegistrationOtp = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
    } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const passwordHash = await argon2.hash(password);

    const otp = generateOtp();

    const otpHash = await hashOtp(otp);

    await EmailVerification.deleteMany({
      email: normalizedEmail,
      purpose: "register",
    });

    await EmailVerification.create({
      email: normalizedEmail,
      name: name.trim(),
      passwordHash,
      otpHash,
      purpose: "register",
      expiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
    });

    await sendOtpEmail(
      normalizedEmail,
      otp,
      "register"
    );

    res.status(200).json({
      success: true,
      message: "Verification OTP sent successfully.",
    });
  } catch (error) {
    console.error("Registration OTP error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send verification OTP.",
    });
  }
};

// ============================================================
// VERIFY REGISTRATION OTP
// ============================================================

const verifyRegistrationOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const verification = await EmailVerification.findOne({
      email: normalizedEmail,
      purpose: "register",
    });

    if (!verification) {
      return res.status(400).json({
        success: false,
        message: "No verification request found.",
      });
    }

    if (verification.expiresAt.getTime() < Date.now()) {
      await EmailVerification.deleteOne({
        _id: verification._id,
      });

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    if (verification.attempts >= 5) {
      await EmailVerification.deleteOne({
        _id: verification._id,
      });

      return res.status(429).json({
        success: false,
        message:
          "Too many incorrect attempts. Request a new OTP.",
      });
    }

    const isValidOtp = await verifyOtp(
      String(otp),
      verification.otpHash
    );

    if (!isValidOtp) {
      verification.attempts += 1;

      await verification.save();

      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      await EmailVerification.deleteOne({
        _id: verification._id,
      });

      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const user = await User.create({
      name: verification.name,
      email: verification.email,
      passwordHash: verification.passwordHash,
    });

    await EmailVerification.deleteOne({
      _id: verification._id,
    });

    req.session.userId = user._id.toString();

    return res.status(201).json({
      success: true,
      message:
        "Email verified and account created successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(
      "Registration OTP verification error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP.",
    });
  }
};

// ============================================================
// SEND FORGOT PASSWORD OTP
// ============================================================

const sendForgotPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.json({
        success: true,
        message:
          "If an account exists, a password reset OTP has been sent.",
      });
    }

    const otp = generateOtp();

    const otpHash = await hashOtp(otp);

    await EmailVerification.deleteMany({
      email: normalizedEmail,
      purpose: "forgot-password",
    });

    await EmailVerification.create({
      email: normalizedEmail,
      otpHash,
      purpose: "forgot-password",
      expiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
    });

    await sendOtpEmail(
      normalizedEmail,
      otp,
      "forgot-password"
    );

    return res.json({
      success: true,
      message:
        "If an account exists, a password reset OTP has been sent.",
    });
  } catch (error) {
    console.error(
      "Forgot password OTP error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to process password reset request.",
    });
  }
};

// ============================================================
// RESET PASSWORD
// ============================================================

const resetPassword = async (req, res) => {
  try {
    const {
      email,
      otp,
      password,
      confirmPassword,
    } = req.body;

    if (!email || !otp || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const verification = await EmailVerification.findOne({
      email: normalizedEmail,
      purpose: "forgot-password",
    });

    if (!verification) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }

    if (verification.expiresAt.getTime() < Date.now()) {
      await EmailVerification.deleteOne({
        _id: verification._id,
      });

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    if (verification.attempts >= 5) {
      await EmailVerification.deleteOne({
        _id: verification._id,
      });

      return res.status(429).json({
        success: false,
        message:
          "Too many incorrect attempts. Request a new OTP.",
      });
    }

    const isValidOtp = await verifyOtp(
      String(otp),
      verification.otpHash
    );

    if (!isValidOtp) {
      verification.attempts += 1;

      await verification.save();

      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      await EmailVerification.deleteOne({
        _id: verification._id,
      });

      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }

    user.passwordHash = await argon2.hash(password);

    await user.save();

    await EmailVerification.deleteOne({
      _id: verification._id,
    });

    return res.json({
      success: true,
      message: "Password reset successful.",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reset password.",
    });
  }
};

module.exports = {
  login,
  logout,
  getCurrentUser,
  sendRegistrationOtp,
  verifyRegistrationOtp,
  sendForgotPasswordOtp,
  resetPassword,
};