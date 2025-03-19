const express = require("express");
const router = express.Router();
const commentProductController = require("../controllers/commentProductController");
const {
  verifyTokenUser,
  verifyTokenAnhAuthorizationUser,
} = require("../../jwt/verifyTokenUser");

router.post(
  "/:productId/:userId",
  verifyTokenAnhAuthorizationUser,
  commentProductController.createCommentProduct
);

router.get(
  "/:productId",
  commentProductController.getCommentProductByProductId
);

router.put(
  "/:commentId/:userId",
  verifyTokenAnhAuthorizationUser,
  commentProductController.updateCommentProduct
);

router.delete(
  "/:commentId/:userId",
  verifyTokenAnhAuthorizationUser,
  commentProductController.deleteCommentProduct
);

router.delete("/", commentProductController.deleteAllCommentProduct);
module.exports = router;
