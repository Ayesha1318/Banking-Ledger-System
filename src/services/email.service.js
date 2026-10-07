const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Banking Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(userEmail, userName) {
  const subject = 'Welcome to Banking Ledger 🎉';

  const text = `
Hi ${userName},

Welcome to Banking Ledger!

Your account has been created successfully. You can now securely manage your banking records and transactions.

Thank you for joining us.

Best regards,
Banking Ledger Team
  `;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Banking Ledger</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f4f7fb;
  font-family: Arial, Helvetica, sans-serif;
">

  <div style="
    max-width: 600px;
    margin: 40px auto;
    background-color: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  ">

    <!-- Header -->
    <div style="
      background-color: #0f172a;
      padding: 30px;
      text-align: center;
    ">
      <h1 style="
        margin: 0;
        color: #ffffff;
        font-size: 28px;
      ">
        Banking Ledger
      </h1>

      <p style="
        margin: 8px 0 0;
        color: #cbd5e1;
        font-size: 14px;
      ">
        Secure. Simple. Reliable.
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 35px;">

      <div style="
        text-align: center;
        margin-bottom: 25px;
      ">
        <div style="
          display: inline-block;
          width: 60px;
          height: 60px;
          line-height: 60px;
          border-radius: 50%;
          background-color: #dcfce7;
          color: #16a34a;
          font-size: 30px;
        ">
          ✓
        </div>
      </div>

      <h2 style="
        text-align: center;
        color: #111827;
        margin: 0 0 15px;
        font-size: 24px;
      ">
        Welcome, ${userName}! 👋
      </h2>

      <p style="
        color: #4b5563;
        font-size: 16px;
        line-height: 1.7;
        text-align: center;
      ">
        We're happy to have you with us.
        Your Banking Ledger account has been created successfully.
      </p>

      <!-- Success Box -->
      <div style="
        margin: 30px 0;
        padding: 20px;
        background-color: #f0fdf4;
        border-left: 4px solid #22c55e;
        border-radius: 6px;
      ">
        <p style="
          margin: 0;
          color: #166534;
          font-size: 15px;
          line-height: 1.6;
        ">
          <strong>Account successfully created!</strong><br>
          You can now securely manage your banking records and transactions.
        </p>
      </div>

      <p style="
        color: #4b5563;
        font-size: 15px;
        line-height: 1.7;
      ">
        Thank you for choosing <strong>Banking Ledger</strong>.
        We look forward to providing you with a simple and reliable
        way to manage your financial records.
      </p>

    <!-- Footer -->
    <div style="
      background-color: #f8fafc;
      padding: 22px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    ">
      <p style="
        margin: 0;
        color: #64748b;
        font-size: 13px;
      ">
        © 2026 Banking Ledger. All rights reserved.
      </p>

      <p style="
        margin: 8px 0 0;
        color: #94a3b8;
        font-size: 12px;
      ">
        This is an automated email. Please do not reply.
      </p>
    </div>

  </div>

</body>
</html>
  `;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = { sendRegistrationEmail };