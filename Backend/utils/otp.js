const crypto = require("crypto");
const argon2 = require("argon2");

const OTP_EXPIRY_MS = 5 * 60 * 1000;

const generateOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

const hashOtp = async (otp) => {
  return await argon2.hash(otp);
};

const verifyOtp = async (otp, otpHash) => {
  return await argon2.verify(otpHash, otp);
};

module.exports = {
  OTP_EXPIRY_MS,
  generateOtp,
  hashOtp,
  verifyOtp,
};