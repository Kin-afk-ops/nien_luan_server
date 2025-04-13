const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const {
  verifyTokenUser,
  verifyTokenAnhAuthorizationUser,
} = require("../../jwt/verifyTokenUser");

router.post("/:id", verifyTokenUser, ProductController.createProduct);
router.put("/:id", verifyTokenUser, ProductController.updateProduct);
router.get(
  "/seller/:id",
  verifyTokenAnhAuthorizationUser,
  ProductController.getProductBySellerId
);

router.get("/oneProduct/:id", ProductController.getProductForEdit);

router.get("/search", ProductController.getSearchProducts);

module.exports = router;
