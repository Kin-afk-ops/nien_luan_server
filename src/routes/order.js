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
  "/:userId",
  verifyTokenAnhAuthorizationUser,
  orderController.readOrder
);

router.put(
  "/:orderId/:userId",

  orderController.updateOrder
);

router.delete(
  "/:orderId/:userId",
  verifyTokenAnhAuthorizationUser,
  orderController.deleteOrder
);

module.exports = router;
