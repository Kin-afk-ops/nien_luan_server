const express = require("express");
const router = express.Router();
const infoUserController = require("../controllers/infoUserController");
const {
  verifyTokenAnhAuthorizationUser,
} = require("../../jwt/verifyTokenUser");

router.post(
  "/:id",
  verifyTokenAnhAuthorizationUser,
  infoUserController.createInfoUser
);
router.get("/:id", infoUserController.readInfoUser);
router.get("/", infoUserController.readAllInfoUser);
router.put(
  "/:id",
  verifyTokenAnhAuthorizationUser,
  infoUserController.updateInfoUser
);
router.delete("/:id", infoUserController.deleteInfoUser);
router.delete("/", infoUserController.deleteAllInfoUser);

module.exports = router;
