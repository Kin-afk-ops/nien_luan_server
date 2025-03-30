const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Products");
const User = require("../models/Users");

exports.createCart = async (req, res) => {
  const newCart = await Cart({
    buyerId: req.params.id,
    ...req.body,
  });
  try {
    const saveCart = await newCart.save();
    res
      .status(200)
      .json(await Cart.findById(saveCart._id).populate("productId"));
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.readCart = async (req, res) => {
  try {
    const cart = await Cart.find({ buyerId: req.params.id })
      .populate("productId") // Lấy đầy đủ thông tin của productId
      .exec();

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Không có sản phẩm trong giỏ hàng" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.readCheckCart = async (req, res) => {
  try {
    const cart = await Cart.find({ buyerId: req.params.id, checked: true })
      .populate("productId") // Lấy đầy đủ thông tin của productId
      .exec();

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Không có sản phẩm trong giỏ hàng" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateCart = async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.cartId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }
    console.log(cart)
    await cart.deleteOne();
    res.status(200).json("Cart has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteAllCart = async (req, res) => {
  try {
    await Cart.deleteMany({
      buyerId: req.params.userId,
    });
    res.status(200).json("All Cart User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllCartById = async (req, res) => {
    try{
        
        const _Id = parseInt(req.params.id, 10);
        
        if(isNaN(categoryId)) {
            return res.status(404).json({ message: "ID danh mục không hợp lệ"})
        }

        const validateCategoryIds = getAllChildCategories(categoryId); 
        let products = productsData.filter(p => validateCategoryIds.includes(p.categoryId));

        products = products.filter(p => p.price >= minPrice && p.price <= maxPrice);
        if(req.query.maxPrice) {
            console.log("Max price ", maxPrice)
        }

        switch (sort) {
            case "newest":
                products.sort((a, b) => b.id - a.id);
                break;
            case "price_asc":
                products.sort((a, b) => a.price - b.price);
                break;
            case "price_desc":
                products.sort((a, b) => b.price - a.price);
                break;
            case "free":
                products = products.filter(p => p.price === 0);
                break;
            default:
                products.sort((a, b) => b.id - a.id); // Mặc định là "newest"
                break;
        }
        const totalProducts = products.length;
        const paginatedProduct = products.slice(skip, skip + limit);

        if(!products) return res.status(404).json({ message: "Sản phẩm thuộc danh mục không tồn tại" });
        return res.json({
            products: paginatedProduct,
            totalPages: Math.ceil(products.length / limit),
            totalProducts,
            page,
        });  // Trả về tất cả sản phẩm theo danh mục

    }catch(error) {
        console.error("Lỗi khi lấy tất cả sản phẩm theo danh mục", error);
        return res.status(500).json({ message: "Lỗi server khi lấy tất cả sản phẩm theo danh mục", error });
    }
}

exports.Cart = async(req, res) => {
  try {
    const cart = await Cart.find({ _id: req.params.id })
      .populate("productId") // Lấy đầy đủ thông tin của productId
      .exec();
    
    const product = await Product.find({ _id: cart[0].productId });
    const user = await User.find({ _id: cart[0].buyerId });

    if (cart) {
      res.status(200).json({cart, product, user});
    } else {
      res.status(404).json({ message: "Không có sản phẩm trong giỏ hàng" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
