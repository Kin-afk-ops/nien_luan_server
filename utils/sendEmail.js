const nodemailer = require("nodemailer");

const sendOTPEmail = async (email, otp) => {
  try {
    if (!email || !otp) {
      throw new Error("Email hoặc OTP không hợp lệ!");
    }
    const transporter = nodemailer.createTransport({
      secure: true,
      host: "smtp.gmail.com",
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Mã OTP của bạn",
      text: `Your OTP code is ${otp}`,
      html: `
          <h1 style="color: #2c3e50;">Chào mừng bạn đến với!</h1>
          <p>Chào ${email}</p>
          <p>Cảm ơn bạn đã đăng ký tài khoản tại <strong>...</strong>. Chúng tôi rất vui mừng khi bạn tham gia cộng đồng của chúng tôi và mong muốn được hỗ trợ bạn đạt được mục tiêu của mình.</p>
          <p>Đây là mã OTP một lần của bạn để xác minh::</p>
          <p style="font-size: 20px; font-weight: bold; color: #0ea5e9;">${otp}</p>
          <p>Vui lòng sử dụng mã này để hoàn tất đăng ký/đăng nhập. Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, vui lòng liên hệ với nhóm hỗ trợ của chúng tôi.</p>
          <p>Chúng tôi rất vui mừng khi có bạn tham gia và rất mong được chứng kiến ​​tất cả những điều tuyệt vời mà bạn sẽ đạt được với ...</p>
          <p>Trân trọng,</p>
          <p><strong>...</strong></p>
        `,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Lỗi khi gửi email:", error.message);
  }
};

module.exports = sendOTPEmail;
