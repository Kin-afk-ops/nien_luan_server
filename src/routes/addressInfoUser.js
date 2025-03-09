const express = require("express");
const router = express.Router();
const addressInfoUserController = require("../controllers/addressInfoUserController");

router.post("/:id", addressInfoUserController.createAddressInfoUser);
router.get("/:id", addressInfoUserController.readAddressInfoUser);
router.put("/:id", addressInfoUserController.UpdateAddressInfoUser);
router.delete("/:id", addressInfoUserController.deleteAddressInfoUser);
router.delete("/", addressInfoUserController.deleteAllAddressInfoUser);

module.exports = router;
