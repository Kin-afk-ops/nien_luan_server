const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const {
  verifyTokenUser,
  verifyTokenAnhAuthorizationUser,
} = require("../../jwt/verifyTokenUser");

router.post("/:id", verifyTokenUser, ProductController.createProduct);
router.get(
  "/seller/:id",
  verifyTokenAnhAuthorizationUser,
  ProductController.getProductBySellerId
);

router.get("/search", verifyTokenUser, ProductController.getSearchProducts);

module.exports = router;
