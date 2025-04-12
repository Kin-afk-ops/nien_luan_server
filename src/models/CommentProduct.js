const mongoose = require("mongoose");

const CommentProductSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    like: {
      type: Number,
      default: 0,
    },
    ratingStar: {
      type: Number,
      default: 0,
    },
    likedBy: {
      type: [String], // Danh sách ID của user đã like
      ref: "Users",
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CommentProduct", CommentProductSchema);
