const Brevo = require("@getbrevo/brevo");


const apiInstance = new Brevo.TransactionalEmailsApi({
  apiKey: process.env.BREVO_API_KEY
});

const sendOTPEmail = async (userEmail, generatedOTP, userName) => {
  try {
    
    const sendSmtpEmail = {
      sender: {
        name: "Nova Online Store",
        email: process.env.SENDER_EMAIL, 
      },
      to: [
        {
          email: userEmail,
          name: userName,
        },
      ],
      subject: "Your OTP Verification Code",
      htmlContent: `
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
      `,
    };

    
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email Sent Successfully via Brevo!");
    return result;

  } catch (err) {
    console.error("❌ BREVO ERROR DETECTED:");
    if (err.response && err.response.body) {
      console.error(JSON.stringify(err.response.body, null, 2));
    } else {
      console.error(err.message || err);
    }
    throw err;
  }
};

module.exports = sendOTPEmail;