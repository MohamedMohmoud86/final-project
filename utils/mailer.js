const nodemailer = require("nodemailer");

// 1. إعداد الـ Transport الخاص بالجيميل
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SEND_EMAIL,      // إيميل الجيميل الخاص بك
    pass: process.env.GMAIL_APP_PASSWORD, // كلمة مرور التطبيق المكونة من 16 حرفاً
  },
});

const sendOTPEmail = async (userEmail, generatedOTP, userName) => {
  try {
    // 2. إعدادات رسالة الإيميل
    const mailOptions = {
      from: `"Nova Online Store" <${process.env.SENDER_EMAIL}>`,
      to: userEmail,
      subject: "Your OTP Verification Code",
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;max-width:500px;margin:auto;border:1px solid #eee;border-radius:10px">
          <h2>Hello ${userName}</h2>
          <p>Your verification code is:</p>
          <h1 style="
              color:#0d6efd;
              letter-spacing:6px;
              font-size:40px;
              background-color:#f8f9fa;
              padding:10px;
              text-align:center;
              border-radius:5px;
          ">
            ${generatedOTP}
          </h1>
          <p style="color:#dc3545;font-weight:bold;">This code expires in 2 minutes.</p>
        </div>
      `, // 🌟 تم تعديلها هنا من htmlContent إلى html
    };

    // 3. إرسال الإيميل فعلياً
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent Successfully via Gmail! MessageID:", info.messageId);
    return info;

  } catch (err) {
    console.error("❌ GMAIL NODEMAILER ERROR:");
    console.error(err.message || err);
    throw err;
  }
};

module.exports = sendOTPEmail;