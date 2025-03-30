const mongoose = require("mongoose");
const Products = require("./Products");

const CartSchema = new mongoose.Schema(
  {
    buyerId: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
