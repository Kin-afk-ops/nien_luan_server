const Order = require("../models/Order");

exports.readSellerOrder = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Lấy trang từ query, mặc định là 1
  const limit = parseInt(req.query.limit) || 10; // Số lượng phần tử mỗi trang, mặc định là 10
  const skipItem = (page - 1) * limit; // Tính vị trí bỏ qua
  const status = req.query.status;

  try {
    let total;
    let order;

    if (status === "Tất cả") {
      const totalResult = await Order.aggregate([
        {
          $lookup: {
            from: "products", // Collection của Product
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },

        { $match: { "product.sellerId": req.params.sellerId } },
        { $count: "total" },
      ]);
      total = totalResult.length > 0 ? totalResult[0].total : 0;
      order = await Order.aggregate([
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
          $match: { "product.sellerId": req.params.sellerId },
        },

        {
          $sort: { createdAt: -1 }, // Sắp xếp theo thời gian tạo
        },
      ])
        .skip(skipItem)
        .limit(limit);
    } else {
      const totalResult = await Order.aggregate([
        {
          $lookup: {
            from: "products", // Collection của Product
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },

        {
          $match: {
            $and: [
              { "product.sellerId": req.params.sellerId },
              { status: status },
            ],
          },
        },
        { $count: "total" },
      ]);

      total = totalResult.length > 0 ? totalResult[0].total : 0;
      order = await Order.aggregate([
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
            $and: [
              { "product.sellerId": req.params.sellerId },
              {
                status: status,
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
