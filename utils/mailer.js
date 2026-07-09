const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (userEmail, generatedOTP, userName) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: "Your OTP Verification Code",
    html: `
      <h2>Hello ${userName}</h2>
      <h3>Your OTP Code</h3>

      <h1>${generatedOTP}</h1>

      <p>This code expires after 2 minutes.</p>
    `,
  };

try {
  await transporter.verify();
  console.log("✅ SMTP Connected");

  const info = await transporter.sendMail(mailOptions);
  console.log(info);
} catch (err) {
  console.error("SMTP ERROR:", err);
  throw err;
}
};

module.exports = sendOTPEmail;