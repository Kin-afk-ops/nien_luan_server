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

    introduce: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InfoUser", InfoUsersSchema);
