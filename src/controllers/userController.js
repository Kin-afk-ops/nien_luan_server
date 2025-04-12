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

exports.createUser = (req, res) => {
    const newUser = req.body;
    Users.create(newUser);
    res.status(201).json(newUser);
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await Users.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User has been deleted successfully." });
  } catch (error) {
    res.status(500).json(error);
  }
};