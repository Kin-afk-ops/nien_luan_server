const mongoose = require("mongoose");

const AddressInfoUser = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    nameAddress: {
      type: String,
      require: true,
    },

    phoneAddress: {
      type: String,
      require: true,
    },

    province: {
      type: String,
      require: true,
    },
    provinceId: {
      type: String,
      require: true,
    },
    district: {
      type: String,
      require: true,
    },
    districtId: {
      type: String,
      require: true,
    },

    ward: {
      type: String,
      require: true,
    },
    wardId: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    default: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AddressInfoUser", AddressInfoUser);
