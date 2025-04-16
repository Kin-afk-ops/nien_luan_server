const CommentProduct = require("../models/CommentProduct");
const Products = require("../models/Products");
const InfoUsers = require("../models/InfoUsers");

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
      const currentCount = product.ratingStar.count || 0;
      const currentRating = product.ratingStar.rating || 0;
      const newCount = currentCount + 1;
      const newRating = ((currentRating * currentCount) + req.body.ratingStar) / newCount;
      await Products.findByIdAndUpdate(req.params.productId, {
        $set: {
          ratingStar: {
            count: newCount,
            average: newRating,
          },
        },
      });
      
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
    }).sort({ createdAt: -1 });

    const commentsWithUserInfo = await Promise.all(
      commentProduct.map(async (comment) => {
        const userInfo = await InfoUsers.findOne({ userId: comment.userId }); // Tìm userInfo dựa trên userId
        return {
          ...comment.toObject(),
          user: userInfo
            ? {
                name: userInfo.name,
                avatar: userInfo.avatar,
                email: userInfo.email,
              }
            : null, // Vẫn thêm trường user, nhưng giá trị là null nếu không có
        };
      })
    );

    if (commentsWithUserInfo) {
      res.status(200).json(commentsWithUserInfo);
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateCommentProduct = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }
    const updateCommentProduct = await CommentProduct.findByIdAndUpdate(
      req.params.commentId,
      {
        $set: {content},
      },
      { new: true }
    );
    if (!updateCommentProduct) {
      return res.status(404).json({ message: "Comment not found" });
    }
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

exports.likeComment = async (req, res) => {
  try {
    const { commentId, userId } = req.params;

    // Tìm comment
    const comment = await CommentProduct.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Kiểm tra nếu user đã like trước đó
    if (comment.likedBy.includes(userId)) {
      return res.status(400).json({ message: "You already liked this comment" });
    }

    // Cập nhật danh sách likedBy và tăng số like
    comment.likedBy.push(userId);
    comment.like += 1;
    await comment.save();

    res.json({ message: "Comment liked", likes: comment.like });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


exports.unlikeComment = async(req, res) => {
  try {
    const {commentId, userId} = req.params;
    const comment = await CommentProduct.findByIdAndUpdate(commentId, { $pull: { likedBy: userId } }, { new: true });
    comment.like -= 1;
    await comment.save();
    res.json({ message: "Comment unliked", likes: comment.like });
  } catch (error) {
    res.status(500).json(error);
  }
}