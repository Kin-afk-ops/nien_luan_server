const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const {
  verifyTokenUser,
  verifyTokenAnhAuthorizationUser,
} = require("../../jwt/verifyTokenUser");

router.post("/:id", cartController.createCart);
router.get("/:id", cartController.readCart);
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
  "/delete/:cartId",
  cartController.deleteCart
);

router.delete(
  "/deleteAll/:userId",
  verifyTokenAnhAuthorizationUser,
  cartController.deleteAllCart
);

router.get('/', async (req, res) => {
  try {
      const carts = await Cart.find();
      res.json(carts);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

module.exports = router;
