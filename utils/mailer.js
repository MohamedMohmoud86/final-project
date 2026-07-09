const nodemailer = require("nodemailer");

// إعداد الاتصال اليدوي بجوجل عبر منفذ SSL الآمن
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true للمنفذ 465، و false لأي منفذ آخر مثل 587
  auth: {
    user: process.env.SENDER_EMAIL,      // إيميل الجيميل
    pass: process.env.GMAIL_APP_PASSWORD, // كلمة مرور التطبيق الـ 16 حرفاً
  },
  // إضافة مهلة اتصال أطول وتجاهل مشاكل الشهادات المؤقتة في السيرفر السحابي
  connectionTimeout: 10000, // 10 ثوانٍ
});