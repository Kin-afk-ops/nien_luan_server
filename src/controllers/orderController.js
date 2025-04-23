const mongoose = require("mongoose");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order({
      buyerId: req.params.userId,
      ...req.body,
    });

    const savedOrders = await newOrder.save();

    res.status(200).json(savedOrders);
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
      order = await Order.aggregate([
        {
          $match: { buyerId: req.params.userId },
        },
        // Lookup lấy product từ productId
        {
          $lookup: {
            from: "products", // Collection của Product
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },

        // Lookup lấy địa chỉ từ product.addressId
        {
          $lookup: {
            from: "addressinfousers", // Collection của Address
            localField: "product.addressId",
            foreignField: "_id",
            as: "product.addressInfo",
          },
        },
        {
          $unwind: {
            path: "$product.addressInfo",
            preserveNullAndEmptyArrays: true,
          },
        },

        // Lookup lấy seller từ product.sellerId
        {
          $lookup: {
            from: "infousers", // Collection của Seller
            localField: "product.sellerId",
            foreignField: "userId",
            as: "product.sellerInfo",
          },
        },
        {
          $unwind: {
            path: "$product.sellerInfo",
            preserveNullAndEmptyArrays: true,
          },
        },

        // Lookup lấy địa chỉ từ addressId bên ngoài
        {
          $lookup: {
            from: "addressinfousers", // Collection của Address
            localField: "addressId",
            foreignField: "_id",
            as: "externalAddress",
          },
        },
        {
          $unwind: {
            path: "$externalAddress",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: { createdAt: -1 }, // Sắp xếp theo thời gian tạo
        },
      ])
        .skip(skipItem)
        .limit(limit);
    } else {
      total = await Order.find({
        buyerId: req.params.userId,
        status: status,
      }).countDocuments();
      order = await Order.aggregate([
        {
          $match: { buyerId: req.params.userId },
          $match: { status: status },
        },
        // Lookup lấy product từ productId
        {
          $lookup: {
            from: "products", // Collection của Product
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },

        // Lookup lấy địa chỉ từ product.addressId
        {
          $lookup: {
            from: "addressinfousers", // Collection của Address
            localField: "product.addressId",
            foreignField: "_id",
            as: "product.addressInfo",
          },
        },
        {
          $unwind: {
            path: "$product.addressInfo",
            preserveNullAndEmptyArrays: true,
          },
        },

        // Lookup lấy seller từ product.sellerId
        {
          $lookup: {
            from: "infousers", // Collection của Seller
            localField: "product.sellerId",
            foreignField: "userId",
            as: "product.sellerInfo",
          },
        },
        {
          $unwind: {
            path: "$product.sellerInfo",
            preserveNullAndEmptyArrays: true,
          },
        },

        // Lookup lấy địa chỉ từ addressId bên ngoài
        {
          $lookup: {
            from: "addressinfousers", // Collection của Address
            localField: "addressId",
            foreignField: "_id",
            as: "externalAddress",
          },
        },
        {
          $unwind: {
            path: "$externalAddress",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: { createdAt: -1 }, // Sắp xếp theo thời gian tạo
        },
      ])
        .skip(skipItem)
        .limit(limit);
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
      order = await Order.aggregate([
        {
          $match: { buyerId: req.params.userId },
        },
        // Lookup lấy product từ productId
        {
          $lookup: {
            from: "products", // Collection của Product
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },

        // Lookup lấy địa chỉ từ product.addressId
        {
          $lookup: {
            from: "addressinfousers", // Collection của Address
            localField: "product.addressId",
            foreignField: "_id",
            as: "product.addressInfo",
          },
        },
        {
          $unwind: {
            path: "$product.addressInfo",
            preserveNullAndEmptyArrays: true,
          },
        },

        // Lookup lấy seller từ product.sellerId
        {
          $lookup: {
            from: "infousers", // Collection của Seller
            localField: "product.sellerId",
            foreignField: "userId",
            as: "product.sellerInfo",
          },
        },
        {
          $unwind: {
            path: "$product.sellerInfo",
            preserveNullAndEmptyArrays: true,
          },
        },

        // Lookup lấy địa chỉ từ addressId bên ngoài
        {
          $lookup: {
            from: "addressinfousers", // Collection của Address
            localField: "addressId",
            foreignField: "_id",
            as: "externalAddress",
          },
        },
        {
          $unwind: {
            path: "$externalAddress",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            $or: [
              { "product.name": { $regex: searchValue, $options: "i" } },
              {
                "product.sellerInfo.name": {
                  $regex: searchValue,
                  $options: "i",
                },
              },
            ],
          },
        },
        {
          $sort: { createdAt: -1 }, // Sắp xếp theo thời gian tạo
        },
      ])
        .skip(skipItem)
        .limit(limit);
    } else {
      total = await Order.find({
        buyerId: req.params.userId,
        status: status,
      }).countDocuments();
      order = await Order.aggregate([
        {
          $match: { buyerId: req.params.userId },
          $match: { status: status },
        },
        // Lookup lấy product từ productId
        {
          $lookup: {
            from: "products", // Collection của Product
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },

        // Lookup lấy địa chỉ từ product.addressId
        {
          $lookup: {
            from: "addressinfousers", // Collection của Address
            localField: "product.addressId",
            foreignField: "_id",
            as: "product.addressInfo",
          },
        },
        {
          $unwind: {
            path: "$product.addressInfo",
            preserveNullAndEmptyArrays: true,
          },
        },

        // Lookup lấy seller từ product.sellerId
        {
          $lookup: {
            from: "infousers", // Collection của Seller
            localField: "product.sellerId",
            foreignField: "userId",
            as: "product.sellerInfo",
          },
        },
        {
          $unwind: {
            path: "$product.sellerInfo",
            preserveNullAndEmptyArrays: true,
          },
        },

        // Lookup lấy địa chỉ từ addressId bên ngoài
        {
          $lookup: {
            from: "addressinfousers", // Collection của Address
            localField: "addressId",
            foreignField: "_id",
            as: "externalAddress",
          },
        },
        {
          $unwind: {
            path: "$externalAddress",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $match: {
            $or: [
              { "product.name": { $regex: searchValue, $options: "i" } },
              {
                "product.sellerInfo.name": {
                  $regex: searchValue,
                  $options: "i",
                },
              },
            ],
          },
        },
        {
          $sort: { createdAt: -1 }, // Sắp xếp theo thời gian tạo
        },
      ])
        .skip(skipItem)
        .limit(limit);
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

    // if (order.status === "Đang chuẩn bị hàng") {
    //   return res
    //     .status(400)
    //     .json({ message: "Không thể thay đổi đơn hàng khi đã được xử lý." });
    // }

    const updateCart = await Order.findByIdAndUpdate(
      req.params.orderId,
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
