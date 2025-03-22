export const getVerificationEmailTemplate = (verificationCode: string) => `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Xác nhận Email</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 500px;
      margin: 40px auto;
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      text-align: center;
    }
    .header {
      background: linear-gradient(90deg, #635BFF, #00c6ff);
      color: white;
      padding: 18px;
      border-radius: 10px 10px 0 0;
      font-size: 22px;
      font-weight: bold;
    }
    .content {
      padding: 20px;
      font-size: 16px;
      color: #333;
      line-height: 1.6;
    }
    .verification-code {
      display: inline-block;
      background: #f0f9ff;
      padding: 12px 20px;
      font-size: 26px;
      font-weight: bold;
      color: #635BFF;
      border: 2px dashed #635BFF;
      border-radius: 8px;
      box-shadow: 2px 2px 10px rgba(0, 0, 255, 0.2);
      margin: 15px 0;
    }
    .footer {
      font-size: 14px;
      color: #666;
      margin-top: 20px;
    }
    .footer a {
      color: #635BFF;
      text-decoration: none;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Xác nhận Đăng ký</div>
    <div class="content">
      <p>Xin chào,</p>
      <p>Cảm ơn bạn đã đăng ký tài khoản tại nền tảng của chúng tôi! Để hoàn tất đăng ký, vui lòng nhập mã xác thực sau:</p>
      <div class="verification-code">
        ${verificationCode}
      </div>
      <p><strong>Mã xác thực có hiệu lực trong 5 phút.</strong></p>
      <p>Nếu bạn không thực hiện đăng ký, vui lòng bỏ qua email này.</p>
    </div>
    <div class="footer">
      <p>Trân trọng,<br><strong>Finance Planner ❤️🚀</strong></p>
      <p>Gặp vấn đề? <a href="mailto:phuocthanh2k03@gmail.com">Liên hệ hỗ trợ</a></p>
    </div>
  </div>
</body>
</html>
`;
