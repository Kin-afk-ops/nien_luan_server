const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { hashPassword, comparePassword } = require("../../hash/hashPassword");
const sendOTPEmail = require("../../utils/sendEmail");
const connectRedis = require("../../utils/connectRedis");
const sendSMS = require("../../utils/sendSMS");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

let pendingUsers = {};
exports.findUserPhone = async (req, res) => {
  const checkUser = await Users.findOne({
    phone: req.body.phone,
  });

  if (checkUser) {
    res.status(200).json({
      message: "Tài khoản đã tồn tại",
      check: true,
    });
  } else {
    res.status(404).json({
      message: "Tài khoản hợp lệ",
      check: false,
    });
  }
};

exports.findUserEmail = async (req, res) => {
  const checkUser = await Users.findOne({
    email: req.body.email,
  });

  if (checkUser) {
    res.status(200).json({
      message: "Tài khoản đã tồn tại",
      check: true,
    });
  } else {
    res.status(404).json({
      message: "Tài khoản hợp lệ",
      check: false,
    });
  }
};

exports.registerUserPhone = async (req, res) => {
  const checkUser = await Users.findOne({
    phone: req.body.phone,
  });

  const newPassword = await hashPassword(req.body.password);
  const otp = generateOTP();
  const otpHash = await hashPassword(otp, 10);

  const redis = connectRedis();

  pendingUsers = {
    phone: req.body.phone,
    password: newPassword,
    otpHash,
  };
  if (checkUser) {
    res.status(409).json({
      message: "User already exists",
    });
  } else {
    try {
      await sendSMS(req.body.phone, otp);
      // if (await redis.get(`otp:${req.body.phone}`)) {
      //   // await redis.del(`otp:${req.body.phone}`);
      //   await sendSMS(req.body.phone, otp);
      //   // await redis.set(`otp:${req.body.phone}`, otpHash, "EX", 300);
      // } else {
      //   await sendSMS(req.body.phone, otp);
      //   // await redis.set(`otp:${req.body.phone}`, otpHash, "EX", 300);
      //   // console.log(req.body.phone);
      // }

      res.status(200).json({
        message: "OTP sent to phone number, please verify to complete signup",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

exports.registerUserEmail = async (req, res) => {
  const checkUser = await Users.findOne({
    email: req.body.email,
  });

  const newPassword = await hashPassword(req.body.password);
  const otp = generateOTP();
  const otpHash = await hashPassword(otp, 10);

  const redis = connectRedis();

  pendingUsers = {
    email: req.body.email,
    password: newPassword,
    otpHash,
  };

  if (checkUser) {
    res.status(409).json({
      message: "User already exists",
    });
  } else {
    // const newUser = new Users({
    //   email: req.body.email,
    //   phone: "none",
    //   password: newPassword,
    // });

    try {
      if (await redis.get(`otp:${req.body.email}`)) {
        await redis.del(`otp:${req.body.email}`);
        await sendOTPEmail(req.body.email, otp);
        await redis.set(`otp:${req.body.email}`, otpHash, "EX", 300);
      } else {
        await sendOTPEmail(req.body.email, otp);
        await redis.set(`otp:${req.body.email}`, otpHash, "EX", 300);
        console.log(req.body.email);
      }

      // const saveUser = await newUser.save();
      // const { password, ...others } = saveUser._doc;

      // res.status(200).json(others);
      res.status(200).json({
        message: "OTP sent to email, please verify to complete signup",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

exports.loginUserPhone = async (req, res) => {
  try {
    const user = await Users.findOne({ phone: req.body.phone });
    !user && res.status(401).json("Wrong credential");

    const isPasswordValid = await comparePassword(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) return res.status(401).json("Wrong credential");

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.loginUserEmail = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong credential");

    const isPasswordValid = await comparePassword(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) return res.status(401).json("Wrong credential");

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.verifyOtp = async (req, res) => {
  const pendingUser = pendingUsers;
  const redis = connectRedis();
  if (!pendingUser) {
    return res
      .status(400)
      .json({ message: "No signup found, please sign up again." });
  }

  if (!req.body.otp) {
    return res.status(400).json({ message: "Hãy nhập mã OTP" });
  }

  try {
    const otpCheck = await redis.get(`otp:${req.body.email}`);

    if (!otpCheck) {
      return res.status(400).json({ message: "Mã OTP hết hạn" });
    }
    const isMatch = await comparePassword(req.body.otp, otpCheck);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Sai mã OTP hoặc mã OTP hết hạn" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Sai mã OTP hoặc mã OTP hết hạn" });
  }

  if (!pendingUser) {
    return res
      .status(400)
      .json({ message: "No signup found, please sign up again." });
  }

  const newUser = new Users({
    email: pendingUser.email,
    phone: "none",
    password: pendingUser.password,
  });

  try {
    const saveUser = await newUser.save();
    const { password, ...others } = saveUser._doc;
    redis.del(`otp:${req.body.email}`);

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};
