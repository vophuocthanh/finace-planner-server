const formattedDate = new Date().toLocaleDateString('vi-VN');
const formattedTime = new Date().toLocaleTimeString('en-US');
const createdAt = `${formattedDate}, ${formattedTime}`;

export const newIncomeEmailTemplate = (
  userName: string,
  email: string,
  amount: number,
  description: string,
  month: string,
): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <div style="text-align: center; padding-bottom: 20px;">
        <h2 style="color: #333;">🎉 Chúc mừng, ${userName}! 🎉</h2>
        <p style="font-size: 16px; color: #555;">Khoản thu nhập cá nhân mới của bạn đã được ghi nhận thành công.</p>
      </div>
      
      <div style="background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <h3 style="color: #635BFF; text-align: center;">Chi tiết thu nhập</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #333;">💰 Số tiền:</td>
            <td style="padding: 8px; color: #333;">${amount.toLocaleString()} VND</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #333;">📜 Mô tả:</td>
            <td style="padding: 8px; color: #333;">${description}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #333;">📅 Tháng:</td>
            <td style="padding: 8px; color: #333;">${month}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #333;">⏰ Ngày tạo:</td>
            <td style="padding: 8px; color: #333;">${createdAt}</td>
          </tr>
        </table>
      </div>

      <p style="text-align: center; margin-top: 20px; font-size: 16px; color: #555;">
        Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi! 🚀<br>
        <a href="https://finace-planner.vercel.app" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #635BFF; color: #fff; text-decoration: none; border-radius: 5px;">Truy cập hệ thống</a>
      </p>
      
      <div style="margin-top: 20px; text-align: center; font-size: 14px; color: #777;">
        <p>Nếu bạn có bất kỳ thắc mắc nào, vui lòng <a href="mailto:phuocthanh2k03@gmail.com" style="color: #007BFF;">liên hệ hỗ trợ</a>.</p>
        <p>&copy; ${new Date().getFullYear()} Finance Planner. Mọi quyền được bảo lưu.</p>
      </div>
    </div>
  `;
};
