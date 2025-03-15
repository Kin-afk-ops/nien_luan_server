const express = require('express');
const router = express.Router();
const products = require('../models/ProductTest');
const categories = require('../models/CategoriesData');
const productController = require('../controller/ProductController');
const userController = require('../controller/userController');
const categoryController = require('../controller/CategoriesController');


router.get('/products', (req, res) => {
  res.json(products);
});

router.get('/categories', (req, res) => {
  res.json(categories);
});

router.get("/products/:id", productController.getProductById);

router.get("/products/:categorySlug/:productSlug/:id", productController.getProductBySlug);
router.get("/products/differentP/:sellerId", productController.getDifferentProductsById);
router.get("/products/similar/:id", productController.getSimilarProductById);
router.get("/seller/:id", userController.getSellerById);
router.get("/categories/:slug",categoryController.getCategoryDataBySlug);
router.get("/categories/products/:id",productController.getAllProductsByCategoryId);
router.get("/categories/list/:id",categoryController.getListCategories);
router.get("/categories/breadcrumb/:id", categoryController.getParentCategories);

module.exports = router;