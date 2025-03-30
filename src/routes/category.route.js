const express = require('express');
const router = express.Router();
const CategoriesController = require("../controllers/CategoriesController");

router.post("/addCate",CategoriesController.addCategory);
router.get("/getallCategories",CategoriesController.getAllCategories);
router.get("/getallCateAttr",CategoriesController.getAllCategoriesAttributes);
router.post("/addAttr",CategoriesController.addCategoryAttributeDetail);

module.exports = router;
