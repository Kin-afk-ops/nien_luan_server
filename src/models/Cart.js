const mongoose = require("mongoose");
const Products = require("./Products");

const CartSchema = new mongoose.Schema(
  {
    buyerId: {
      type: String,
      required: true,
    },
    product: Products.schema,
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
