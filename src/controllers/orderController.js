const mongoose = require("mongoose");
const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const newOrder = await Order({
    buyerId: req.params.userId,
    ...req.body,
  });
  try {
    const saveCart = await newOrder.save();
    res
      .status(200)
      .json(
        await Order.findById(saveCart._id)
          .populate("products.productId")
          .populate("addressId")
      );
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.readOrder = async (req, res) => {
  try {
    const order = await Order.find({ buyerId: req.params.userId })
      .populate("products.productId")
      .populate("addressId")
      .exec();
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Không có sản phẩm trong giỏ hàng" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    }

    if (order.status !== "Đang chuẩn bị hàng") {
      return res
        .status(400)
        .json({ message: "Không thể thay đổi đơn hàng khi đã được xử lý." });
    }

    const updateCart = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .populate("products.productId")
      .populate("addressId")
      .exec();
    res.status(200).json(updateCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    }

    if (order.status !== "Đang chuẩn bị hàng") {
      return res
        .status(400)
        .json({ message: "Không thể huỷ đơn hàng khi đã được xử lý." });
    }

    await Order.findByIdAndDelete(req.params.orderId);

    res.status(200).json({ message: "Đơn hàng đã được huỷ thành công." });
  } catch (error) {
    console.error("Lỗi khi huỷ đơn hàng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error });
  }
};

// exports.deleteAll = async (req, res) => {
//   try {
//     await Cart.deleteMany({
//       buyerId: req.params.userId,
//     });
//     res.status(200).json("All Cart User has been deleted...");
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
