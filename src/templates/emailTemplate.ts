export function getResetPasswordTemplate(access_token: string): string {
  return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Đặt lại mật khẩu</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1); }
        .header { background-color: #4CAF50; color: white; padding: 10px 0; text-align: center; border-radius: 8px 8px 0 0; }
        .content { padding: 20px; font-size: 16px; color: #333333; line-height: 1.6; }
        .btn { display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .footer { text-align: center; font-size: 12px; color: #777777; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Đặt lại mật khẩu của bạn</h2>
        </div>
        <div class="content">
          <p>Xin chào,</p>
          <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu của bạn. Nếu bạn không yêu cầu điều này, vui lòng bỏ qua email này.</p>
          <p>Nếu bạn muốn tiếp tục đặt lại mật khẩu, vui lòng nhấn vào nút dưới đây:</p>
          <a href="http://localhost:4000/reset-password?access_token=${access_token}" class="btn">Đặt lại mật khẩu</a>
          <p>Liên kết đặt lại mật khẩu này sẽ hết hạn sau 24 giờ.</p>
        </div>
        <div class="footer">
          <p>Trân trọng,<br>Đội ngũ hỗ trợ</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
