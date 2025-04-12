const ImageProducts = require("../models/ImageProduct");
const Products = require("../models/Products");

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

exports.getImageProductByUserId = async (req, res) => {
  try {
    const ImageProduct = await ImageProducts.find({
      userId: req.params.userId,
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

exports.updateImageProduct = async (req, res) => {
  try {
    const updateImageProduct = await ImageProducts.findByIdAndUpdate(
      req.params.imageId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateImageProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteImageProduct = async (req, res) => {
  try {
    await ImageProducts.findByIdAndDelete(req.params.id);
    res.status(200).json("Image has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteAllImageProduct = async (req, res) => {
  try {
    await ImageProducts.deleteMany();
    res.status(200).json("Image User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};
