const mongoose = require("mongoose");
const Cart = require("../models/Cart");

exports.createCart = async (req, res) => {
  const newCart = await Cart({
    buyerId: req.params.id,
    ...req.body,
  });
  try {
    const saveCart = await newCart.save();
    res
      .status(200)
      .json(await Cart.findById(saveCart._id).populate("productId"));
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.readCart = async (req, res) => {
  try {
    const cart = await Cart.find({ buyerId: req.params.id })
      .populate("productId") // Lấy đầy đủ thông tin của productId
      .exec();

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Không có sản phẩm trong giỏ hàng" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.readCheckCart = async (req, res) => {
  try {
    const cart = await Cart.find({ buyerId: req.params.id, checked: true })
      .populate("productId") // Lấy đầy đủ thông tin của productId
      .exec();

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Không có sản phẩm trong giỏ hàng" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateCart = async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.cartId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.cartId);
    res.status(200).json("Cart has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteAllCart = async (req, res) => {
  try {
    await Cart.deleteMany({
      buyerId: req.params.userId,
    });
    res.status(200).json("All Cart User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};
