const mongoose = require("mongoose");

const InfoUsersSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    avatar: {
      path: {
        type: String,
      },
      publicId: {
        type: String,
      },
    },
    name: {
      type: String,
      require: true,
    },

    gender: {
      type: String,
    },
    birthday: {
      type: String,
    },
    address: [
      {
        province: {
          type: String,
          require: true,
        },
        district: {
          type: String,
          require: true,
        },
        ward: {
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
    ],

    introduce: {
      type: string,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InfoUser", InfoUsersSchema);
