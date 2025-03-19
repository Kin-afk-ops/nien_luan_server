const mongoose = require("mongoose");
const Products = require("./Products");
const AddressInfoUser = require("./AddressInfoUser");

const OrderSchema = new mongoose.Schema(
  {
    buyerId: {
      type: String,
      required: true,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddressInfoUser",
      required: true,
    },
    status: {
      type: String,
      default: "Đang chuẩn bị hàng",
    },
    note: {
      type: String,
    },

    shippingFee: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    paymentMethod: {
      type: String,
      required: true,
    },

    received: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
