const express = require("express");
const router = express.Router();
const products = require("../models/ProductTest");
const categories = require("../models/CategoriesData");
const productController = require("../controllers/ProductController");
const userController = require("../controllers/userController");
const categoryController = require("../controllers/CategoriesController");
const authController = require("../controllers/authController");
router.get("/products", (req, res) => {
  res.json(products);
});

router.get("/categories", (req, res) => {
  res.json(categories);
});

router.get("/products/:id", productController.getProductById);

router.get(
  "/products/:categorySlug/:productSlug/:id",
  productController.getProductBySlug
);
router.get(
  "/products/differentP/:sellerId",
  productController.getDifferentProductsById
);
router.get("/products/similar/:id", productController.getSimilarProductById);
router.get("/seller/:id", userController.getSellerById);
router.get("/categories/:slug", categoryController.getCategoryDataBySlug);
router.get(
  "/categories/products/:id",
  productController.getAllProductsByCategoryId
);
router.get(
  "/categories/breadcrumb/:id",
  categoryController.getParentCategories
);

//User
router.post("/auth/register/find/phone", authController.findUserPhone);
router.post("/auth/register/find/email", authController.findUserEmail);
router.post("/auth/register/phone", authController.registerUserPhone);
router.post("/auth/register/email", authController.registerUserEmail);
router.post("/auth/login/phone", authController.loginUserPhone);
router.post("/auth/login/email", authController.loginUserEmail);

// OTP
router.post("/auth/verify-otp", authController.verifyOtp);

module.exports = router;
