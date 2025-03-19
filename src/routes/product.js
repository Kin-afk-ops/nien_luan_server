const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const {
  verifyTokenUser,
  verifyTokenAnhAuthorizationUser,
} = require("../../jwt/verifyTokenUser");

router.post("/:id", verifyTokenUser, ProductController.createProduct);
router.get(
  "/:id",
  verifyTokenAnhAuthorizationUser,
  ProductController.getProductBySellerId
);

router.get("/categories/:id", ProductController.getProductByCategories);

module.exports = router;
