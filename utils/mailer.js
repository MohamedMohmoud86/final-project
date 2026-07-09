// استيراد مكتبة Resend مباشرة (سنعتمد على الفيسش المدمج في نود أو الأوبجكت البسيط)
const sendOTPEmail = async (userEmail, generatedOTP, userName) => {
  try {
    // إرسال الإيميل عبر طلب API (HTTP POST) - هذا مستحيل أن يحجبه Railway
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Nova Store <onboarding@resend.dev>", // اتركه هكذا في الخطة المجانية للتجربة
        to: [userEmail],
        subject: "Your OTP Verification Code",
        html: `
          <div style="font-family:Arial,sans-serif;padding:20px;max-width:500px;margin:auto;border:1px solid #eee;border-radius:10px">
            <h2>Hello ${userName}</h2>
            <p>Your verification code is:</p>
            <h1 style="color:#0d6efd;letter-spacing:6px;font-size:40px;background-color:#f8f9fa;padding:10px;text-align:center;border-radius:5px;">
              ${generatedOTP}
            </h1>
            <p style="color:#dc3545;font-weight:bold;">This code expires in 2 minutes.</p>
          </div>
        `,
      }),
    });

    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.message || "Failed to send email via Resend");
    }

    console.log("✅ Email Sent Successfully via Resend API!", resData);
    return resData;

  } catch (err) {
    console.error("❌ RESEND API ERROR:");
    console.error(err.message || err);
    throw err;
  }
};

module.exports = sendOTPEmail;