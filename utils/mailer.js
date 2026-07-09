const Brevo = require("@getbrevo/brevo");

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendOTPEmail = async (userEmail, generatedOTP, userName) => {
  try {
    const email = new Brevo.SendSmtpEmail();

    email.sender = {
      name: "Nova Online Store",
      email: process.env.SENDER_EMAIL,
    };

    email.to = [
      {
        email: userEmail,
        name: userName,
      },
    ];

    email.subject = "Your OTP Verification Code";

    email.htmlContent = `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2>Hello ${userName}</h2>

        <p>Your verification code is:</p>

        <h1 style="
            color:#0d6efd;
            letter-spacing:6px;
            font-size:40px;
        ">
          ${generatedOTP}
        </h1>

        <p>This code expires in 2 minutes.</p>
      </div>
    `;

    const result = await apiInstance.sendTransacEmail(email);

    console.log("✅ Email Sent");
    console.log(result.body);

  } catch (err) {
    console.error("BREVO ERROR");
    console.error(err);
    throw err;
  }
};

module.exports = sendOTPEmail;