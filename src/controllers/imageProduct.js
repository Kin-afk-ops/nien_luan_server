const ImageProducts = require("../models/ImageProduct");
const Products = require("../models/ProductModel");

exports.createImageProduct = async (req, res) => {
  const product = await Products.findById(req.params.productId);
  if (product) {
    const newImageProduct = await ImageProducts({
      productId: req.params.productId,
      userId: req.params.userId,
      ...req.body,
    });
    try {
      const saveProduct = await newImageProduct.save();
      res.status(200).json(saveProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json({ message: "Sản phẩm không tồn tại" });
  }
};

exports.getImageProductByProductId = async (req, res) => {
  try {
    const ImageProduct = await ImageProducts.find({
      productId: req.params.productId,
    });
    if (ImageProduct) {
      res.status(200).json(ImageProduct);
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
