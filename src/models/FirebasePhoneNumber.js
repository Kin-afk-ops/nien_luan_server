const mongoose = require("mongoose");

const FirebasePhoneNumberSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "FirebasePhoneNumber",
  FirebasePhoneNumberSchema
);
