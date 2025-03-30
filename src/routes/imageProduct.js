const express = require("express");
const router = express.Router();
const ImageProductController = require("../controllers/imageProductController");
const {
  verifyTokenUser,
  verifyTokenAnhAuthorizationUser,
} = require("../../jwt/verifyTokenUser");

router.post(
  "/:productId/:userId",
  verifyTokenAnhAuthorizationUser,
  ImageProductController.createImageProduct
);
router.get(
  "/productId/:productId",
  ImageProductController.getImageProductByProductId
);
router.get("/userId/:userId", ImageProductController.getImageProductByUserId);
router.put(
  "/:imageId/:userId",
  verifyTokenAnhAuthorizationUser,
  ImageProductController.updateImageProduct
);
router.delete(
  "/:id",

  ImageProductController.deleteImageProduct
);
router.delete("/", ImageProductController.deleteAllImageProduct);

module.exports = router;
