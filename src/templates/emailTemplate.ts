export function getResetPasswordTemplate(access_token: string): string {
  return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Đặt lại mật khẩu</title>
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
          padding: 20px;
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
        .btn {
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
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          font-size: 18px;
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
        <div class="header">Đặt lại mật khẩu</div>
        <div class="content">
          <p>Xin chào,</p>
          <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
          <p>Nhấn vào nút bên dưới để đặt lại mật khẩu:</p>
          <a href="http://localhost:4000/reset-password?access_token=${access_token}" class="btn">Đặt lại mật khẩu</a>
          <p><strong>Liên kết này sẽ hết hạn sau 24 giờ.</strong></p>
        </div>
        <div class="footer">
          <p>Trân trọng,<br><strong>Finance Planner ❤️</strong></p>
          <p>Gặp vấn đề? <a href="mailto:phuocthanh2k03@gmail.com">Liên hệ hỗ trợ</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}
