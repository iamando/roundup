const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    port: process.env.SMTP_PORT,
    ignoreTLS: true,
    // other settings...
  });

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;
