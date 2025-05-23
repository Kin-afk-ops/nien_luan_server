const express = require("express");
const router = express.Router();
const products = require("../models/ProductTest");
const categories = require("../models/CategoriesData");
const productController = require("../controllers/ProductController");
const userController = require("../controllers/userController");
const categoryController = require("../controllers/CategoriesController");
const authController = require("../controllers/authController");
const firebaseAuthController = require("../controllers/firebaseAuthController");
const {
  verifyTokenUser,
  verifyTokenAnhAuthorizationUser,
} = require("../../jwt/verifyTokenUser");

const imageController = require("../controllers/imageController");

const fileUploader = require("../../config/cloudinary");

router.get("/products", productController.getAllProducts);

router.get("/products/:id", productController.getProductById);
router.post("/products/:id", productController.createProduct);
router.get("/products/freeProduct/get", productController.getFreeProduct);
router.get(
  "/products/outstanding/:id",
  productController.getOutStandingProductByCateId
);

// router.put("/products/:id", productController.editProduct);

router.delete("/products/:id", productController.deleteProduct);

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

router.get("/categories/list/:id", categoryController.getListCategories);
router.get(
  "/categories/attributes/:id",
  categoryController.getAttributesOfCategory
);

//auth
router.post("/auth/register/find/phone", authController.findUserPhone);
router.post("/auth/register/find/email", authController.findUserEmail);
router.post(
  "/auth/register/find/firebase",
  firebaseAuthController.findFirebaseUser
);
router.post("/auth/register/phone", authController.registerUserPhone);
router.post("/auth/register/email", authController.registerUserEmail);
router.post("/auth/login/phone", authController.loginUserPhone);
router.post("/auth/login/email", authController.loginUserEmail);
router.put(
  "/auth/update/email/:id",
  verifyTokenAnhAuthorizationUser,
  authController.updateEmail
);

router.put(
  "/auth/update/phone/:id",
  verifyTokenAnhAuthorizationUser,
  authController.updatePhone
);

router.post("/products/createTest", productController.createTestProduct);

router.put(
  "/auth/update/password/:id",
  verifyTokenAnhAuthorizationUser,
  authController.updatePassword
);

router.get("/auth/firebase/phone/:id", authController.getFirebasePhone);

router.delete("/auth/firebase/phone/", authController.deleteFirebasePhone);

// user
router.get("/user", userController.getAllUser);

router.get("/user/:id", userController.getUserById);

router.put("/user/:id", userController.editUser);

router.delete("/user", userController.deleteAllUser);

router.delete("/user/:id", userController.deleteUser);

router.post("/user", userController.createUser);

// OTP
router.post("/auth/verify-otp", authController.verifyOtp);
router.put(
  "/auth/verify-otp-email/:id/:otp",
  verifyTokenAnhAuthorizationUser,
  authController.verifyUpdateUser
);

// Image
router.post(
  "/image/upload",
  fileUploader.single("file"),
  imageController.uploadImage
);

router.delete("/image/remove/:id", imageController.removeImage);

router.get("/getAllProductTest", productController.getAllProducts);

// InfoUser

module.exports = router;
