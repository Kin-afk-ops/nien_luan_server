const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UsersSchema);
