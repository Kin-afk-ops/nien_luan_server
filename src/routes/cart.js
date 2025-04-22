const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

const {
  verifyTokenUser,
  verifyTokenAnhAuthorizationUser,
} = require("../../jwt/verifyTokenUser");

router.post("/:id", verifyTokenAnhAuthorizationUser, cartController.createCart);
router.get("/:id", verifyTokenAnhAuthorizationUser, cartController.readCart);
router.get(
  "/checked/:id",
  verifyTokenAnhAuthorizationUser,
  cartController.readCheckCart
);
router.put(
  "/:cartId/:userId",
  verifyTokenAnhAuthorizationUser,
  cartController.updateCart
);
router.delete(
  "/delete/:cartId/:userId",
  verifyTokenAnhAuthorizationUser,
  cartController.deleteCart
);

router.delete(
  "/deleteCheck/:id",
  verifyTokenAnhAuthorizationUser,
  cartController.deleteCheckedCart
);

router.delete(
  "/deleteAll/:userId",
  verifyTokenAnhAuthorizationUser,
  cartController.deleteAllCart
);

module.exports = router;
