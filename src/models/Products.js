const mongoose = require("mongoose");
const AddressInfoUser = require("./AddressInfoUser");

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
      name: {
        type: String,
      },
      slug: {
        type: String,
      },
      parentId: {
        type: String,
        default: null,
      },
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
    address: AddressInfoUser.schema,
    discount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
