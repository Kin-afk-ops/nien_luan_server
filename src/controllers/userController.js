const userData = require("../models/UserDataTest");
const Users = require("../models/Users");

const getAllUsers = (req, res) => {
  res.json(userData);
};

exports.getSellerById = (req, res) => {
  const { id } = req.params;
  const sellerId = parseInt(id);
  const seller = userData.find((u) => u.id === sellerId);
  if (!seller)
    return res.status(404).json({ message: "Người dùng không tồn tại" });
  res.json(seller);
};

exports.getAllUser = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await Users.find().sort({ createdAt: -1 }).limit(5)
      : await Users.find().sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// LInh put

exports.deleteAllUser = async (req, res) => {
  try {
    await Users.deleteMany();
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};
