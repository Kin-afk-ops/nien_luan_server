const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(
  "ACebe5708ac20760bf2b5eb65b33a37293",
  "cd0a5faf0d8b86d1a3ce72bff32e1809"
);

const sendSMS = async (phoneNumber, otp) => {
  try {
    await client.messages.create({
      body: `Mã OTP của bạn là: ${otp}`,
      from: "+15344295994",
      to: phoneNumber,
    });
    console.log(client);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendSMS;
