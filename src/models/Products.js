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
      ref: "InfoUser",
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
    ratingStar: {
      count: {
        type: Number,
        default: 0,
      },
      average: {
        type: Number,
        default: 0,
      },
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
    image: {
      path: {
        type: String,
      },
      publicId: {
        type: String,
      },
    },

    sold: {
      type: Boolean,
      default: false,
    },
    address: {
      type: AddressInfoUser.schema,
      required: true,
    },
    approve: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
