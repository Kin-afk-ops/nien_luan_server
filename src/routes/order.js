const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const {
  verifyTokenUser,
  verifyTokenAnhAuthorizationUser,
} = require("../../jwt/verifyTokenUser");

router.post(
  "/:userId",
  verifyTokenAnhAuthorizationUser,
  orderController.createOrder
);

router.get(
  "/product/:userId",
  verifyTokenAnhAuthorizationUser,
  orderController.readOrder
);

router.get(
  "/search/:userId",
  verifyTokenAnhAuthorizationUser,
  orderController.readSearchOrder
);

router.put(
  "/:orderId/:userId",
  verifyTokenAnhAuthorizationUser,
  orderController.updateOrder
);

router.delete(
  "/:orderId/:userId",
  verifyTokenAnhAuthorizationUser,
  orderController.deleteOrder
);

module.exports = router;
