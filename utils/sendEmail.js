const nodemailer = require("nodemailer");

const sendOTPEmail = async (email, otp) => {
  try {
    if (!email || !otp) {
      throw new Error("Email hoặc OTP không hợp lệ!");
    }
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
      html: `
          <h1 style="color: #2c3e50;">Welcome to Solve It Out!</h1>
          <p>Dear Valued User,</p>
          <p>Thank you for signing up with <strong>Solve It Out</strong>. We are thrilled to have you join our community and look forward to supporting you in achieving your goals.</p>
          <p>Here is your one-time OTP code for verification:</p>
          <p style="font-size: 20px; font-weight: bold; color: #0ea5e9;">${otp}</p>
          <p>Please use this code to complete your registration/login. If you have any questions or need assistance, feel free to reach out to our support team.</p>
          <p>We are excited to have you on board and can't wait to see all the amazing things you'll accomplish with Solve It Out.</p>
          <p>Warm regards,</p>
          <p><strong>The Solve It Out Team</strong></p>
        `,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Lỗi khi gửi email:", error.message);
  }
};

module.exports = sendOTPEmail;
