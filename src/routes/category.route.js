const express = require("express");
const router = express.Router();
const CategoriesController = require("../controllers/CategoriesController");

router.post("/addCate",CategoriesController.addCategory);
router.get("/getallCategories",CategoriesController.getAllCategories);
router.get("/getCategoryById/:id",CategoriesController.getCategoryById);
router.get("/getallCateAttr",CategoriesController.getAllCategoriesAttributes);
router.post("/addAttr",CategoriesController.addCategoryAttributeDetail);
router.put("/updateAttr/:attributeId",CategoriesController.updateCategoriesAttributes);
router.get("/getAttrByCateId/:id",CategoriesController.getAttributeByCategoryId);
router.put("/updateCate/:id",CategoriesController.updateCategory);

module.exports = router;
