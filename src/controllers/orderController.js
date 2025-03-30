const mongoose = require("mongoose");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.createOrder = async (req, res) => {
  try {
    const newOrder = req.body.map((order) => ({
      buyerId: req.params.userId, // Gán userId cho tất cả đơn hàng
      ...order,
    }));

    const savedOrders = await Order.insertMany(newOrder);

    const populatedOrders = await Order.find({
      _id: { $in: savedOrders.map((o) => o._id) },
    })
      .populate("products.productId")
      .populate("addressId")
      .exec();

    res.status(200).json(populatedOrders);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.readOrder = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Lấy trang từ query, mặc định là 1
  const limit = parseInt(req.query.limit) || 10; // Số lượng phần tử mỗi trang, mặc định là 10
  const skipItem = (page - 1) * limit; // Tính vị trí bỏ qua
  const status = req.query.status;

  try {
    let total;
    let order;

    if (status === "Tất cả") {
      total = await Order.find({
        buyerId: req.params.userId,
      }).countDocuments();
      order = await Order.find({
        buyerId: req.params.userId,
      })
        .skip(skipItem)
        .limit(limit)
        .populate("products.productId")
        .populate("addressId")
        .exec();
    } else {
      total = await Order.find({
        buyerId: req.params.userId,
        status: status,
      }).countDocuments();
      order = await Order.find({ buyerId: req.params.userId, status: status })
        .skip(skipItem)
        .limit(limit)
        .populate("products.productId")
        .populate("addressId")
        .exec();
    }

    if (order) {
      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        data: order,
      });
    } else {
      res.status(404).json({ message: "Không có sản phẩm trong giỏ hàng" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.readSearchOrder = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Lấy trang từ query, mặc định là 1
  const limit = parseInt(req.query.limit) || 10; // Số lượng phần tử mỗi trang, mặc định là 10
  const skipItem = (page - 1) * limit; // Tính vị trí bỏ qua
  const status = req.query.status;
  const searchValue = req.query.searchValue;

  try {
    let total;
    let order;

    if (status === "Tất cả") {
      total = await Order.find({
        buyerId: req.params.userId,
      }).countDocuments();
      order = await Order.find({ buyerId: req.params.userId })
        .skip(skipItem)
        .limit(limit)
        .populate("products.productId")
        .populate("addressId")
        .exec();
    } else {
      total = await Order.find({
        buyerId: req.params.userId,
        status: status,
      }).countDocuments();
      order = await Order.find({ buyerId: req.params.userId, status: status })
        .skip(skipItem)
        .limit(limit)
        .populate("products.productId")
        .populate("addressId")
        .exec();
    }

    if (order) {
      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        data: order,
      });
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
