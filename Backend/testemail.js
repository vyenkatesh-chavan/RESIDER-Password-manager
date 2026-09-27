const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

console.log("GMAIL:", process.env.MY_GMAIL);
console.log(
  "APP PASSWORD EXISTS:",
  Boolean(process.env.MY_PASS)
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_GMAIL,
    pass: process.env.MY_PASS,
  },
});

const sendTestEmail = async () => {
  try {
    await transporter.verify();

    console.log("SMTP connection successful.");

    const info = await transporter.sendMail({
      from: `"RESIDER Test" <${process.env.MY_GMAIL}>`,
      to: process.env.MY_GMAIL,
      subject: "RESIDER Gmail Test",
      text: "This is a test email from RESIDER.",
    });

    console.log("Email sent successfully.");
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("Email test failed:");
    console.error(error);
  }
};

sendTestEmail();