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
      id: {
        type: Number,
      },
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
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddressInfoUser",
      required: true,
    },
    images: {
      id: {
        type: Number,
      },
      url: {
        type: [String],
      },
    },
    discount: {
      type: Number,
    },
    size: {
      type: String,
    },
    isFreeShip: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
