const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },

    categories: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    addressId: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
