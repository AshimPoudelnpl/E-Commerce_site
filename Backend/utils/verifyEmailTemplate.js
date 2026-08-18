const VerificationEmail = (username, otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>

      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          color: #333;
        }

        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
          text-align: center;
          margin-bottom: 25px;
        }

        .header h1 {
          color: #2563eb;
          margin: 0;
        }

        .content {
          text-align: center;
          line-height: 1.6;
        }

        .otp {
          display: inline-block;
          margin: 20px 0;
          padding: 15px 30px;
          background-color: #f1f5f9;
          color: #2563eb;
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
          border-radius: 8px;
        }

        .message {
          font-size: 16px;
        }

        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 13px;
          color: #777;
        }
      </style>
    </head>

    <body>
      <div class="container">

        <div class="header">
          <h1>Email Verification</h1>
        </div>

        <div class="content">
          <p class="message">
            Hello <strong>${username}</strong>,
          </p>

          <p class="message">
            Thank you for registering with our e-commerce website.
            Please use the OTP below to verify your email address.
          </p>

          <div class="otp">
            ${otp}
          </div>

          <p class="message">
            This OTP is valid for a limited time.
          </p>

          <p class="message">
            If you did not create an account, you can safely ignore this email.
          </p>
        </div>

        <div class="footer">
          <p>&copy; 2026 Your E-commerce Store. All rights reserved.</p>
        </div>

      </div>
    </body>
    </html>
  `;
};

export default VerificationEmail;
