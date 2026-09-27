const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_GMAIL,
    pass: process.env.MY_PASS,
  },
});

const sendOtpEmail = async (email, otp, purpose) => {
  console.log("========== OTP EMAIL DEBUG ==========");
  console.log("From:", process.env.MY_GMAIL);
  console.log("To:", email);
  console.log("Purpose:", purpose);
  console.log("OTP generated:", Boolean(otp));

  const subject =
    purpose === "register"
      ? "Verify Your RESIDER Email"
      : "Reset Your RESIDER Password";

  const message =
    purpose === "register"
      ? "Use the OTP below to verify your email address."
      : "Use the OTP below to reset your RESIDER password.";

  const info = await transporter.sendMail({
    from: `"RESIDER" <${process.env.MY_GMAIL}>`,
    to: email,
    subject,
    text:
      `${message}\n\n` +
      `Your OTP is: ${otp}\n\n` +
      `This OTP expires in 5 minutes.\n\n` +
      `If you did not request this, ignore this email.`,
  });

  // console.log("Email accepted by SMTP.");
  // console.log("Message ID:", info.messageId);
  // console.log("Accepted:", info.accepted);
  // console.log("Rejected:", info.rejected);
  // console.log("=====================================");
};

module.exports = {
  sendOtpEmail,
};