const express = require("express");
const router = express.Router();
const infoUserController = require("../controllers/infoUserController");

router.post("/:id", infoUserController.createInfoUser);
router.get("/:id", infoUserController.readInfoUser);
router.put("/:id", infoUserController.updateInfoUser);
router.delete("/:id", infoUserController.deleteInfoUser);
router.delete("/", infoUserController.deleteAllInfoUser);

module.exports = router;
