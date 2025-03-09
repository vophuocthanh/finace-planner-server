export const getVerificationEmailTemplate = (verificationCode: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      background-color: #007bff;
      color: white;
      padding: 15px;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 20px;
      font-size: 16px;
      color: #333333;
      line-height: 1.5;
    }
    .verification-code {
      display: block;
      width: fit-content;
      margin: 20px auto;
      background-color: #f4f4f4;
      padding: 15px 25px;
      font-size: 24px;
      font-weight: bold;
      color: #007bff;
      border: 2px solid #007bff;
      border-radius: 8px;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
      color: #888888;
    }
    .footer a {
      color: #007bff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Xác nhận Đăng ký</h1>
    </div>
    <div class="content">
      <p>Chào bạn,</p>
      <p>Cảm ơn bạn đã đăng ký tài khoản trên nền tảng Nestjs API của chúng tôi. Để hoàn tất quá trình đăng ký, vui lòng nhập mã xác thực dưới đây:</p>
      <div class="verification-code">
        ${verificationCode}
      </div>
      <p>Mã xác thực này sẽ hết hạn sau 5 phút. Nếu bạn không thực hiện đăng ký, mã xác thực sẽ không còn giá trị.</p>
      <p>Nếu bạn không thực hiện đăng ký, vui lòng bỏ qua email này.</p>
    </div>
    <div class="footer">
      <p>Trân trọng,<br>Nestjs API Team ❤️🐼🐧🚀⚡⚡</p>
    </div>
  </div>
</body>
</html>
`;
