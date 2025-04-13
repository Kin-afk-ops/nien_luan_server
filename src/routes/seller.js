const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerController");
const {
  verifyTokenUser,
  verifyTokenAnhAuthorizationUser,
} = require("../../jwt/verifyTokenUser");

router.get(
  "/product/:sellerId",
  verifyTokenAnhAuthorizationUser,
  sellerController.readSellerOrder
);

module.exports = router;
