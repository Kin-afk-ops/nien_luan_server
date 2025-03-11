const CommentProduct = require("../models/CommentProduct");
const Products = require("../models/Products");

exports.createCommentProduct = async (req, res) => {
  const product = await Products.findById(req.params.productId);
  if (product) {
    const newCommentProduct = await CommentProduct({
      productId: req.params.productId,
      userId: req.params.userId,
      ...req.body,
    });
    try {
      const saveProduct = await newCommentProduct.save();
      res.status(200).json(saveProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json({ message: "Sản phẩm không tồn tại" });
  }
};

exports.getCommentProductByProductId = async (req, res) => {
  try {
    const commentProduct = await CommentProduct.find({
      productId: req.params.productId,
    });
    if (commentProduct) {
      res.status(200).json(commentProduct);
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateCommentProduct = async (req, res) => {
  try {
    const updateCommentProduct = await CommentProduct.findByIdAndUpdate(
      req.params.commentId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCommentProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteCommentProduct = async (req, res) => {
  try {
    await CommentProduct.findByIdAndDelete(req.params.commentId);
    res.status(200).json("Comment has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteAllCommentProduct = async (req, res) => {
  try {
    await CommentProduct.deleteMany();
    res.status(200).json("Image User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};
