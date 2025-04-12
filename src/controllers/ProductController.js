const productsData = require("../models/ProductTest");
const categoriesData = require("../models/CategoriesData");
const Products = require("../models/Products");
const { getAllChildCategories } = require("../services/categoryServices");

const exampleProduct = new Products({
  name: "Laptop HP 14s-fq1080AU",
  sellerId: "10009",
  categories: {
    id: 10,
    name: "laptop",
    slug: "laptop",
  },
  slug: "hp-laptop",
  condition: "new",
  quantity: 10,
  price: 9500000,
  description: "Laptop HP 14s-fq1080AU",
  details: {
    brand: "HP",
    ram: "4GB",
    memory: "256TB",
    cpu: "Intel Core i3",
    os: "Windows",
    battery: "5h",
    color: "Bạc",
    size: "14 inch",
  },
  images: {
    id: 1,
    url: [
      "https://laptop360.net/wp-content/uploads/2023/02/Laptop-HP-14s-fq1080AU-2.jpg",
    ],
  },
  discount: 0,
  isFreeShip: true,
  address: {
    province: "Hồ Chí Minh",
  },
});

exports.getProductBySlug = (req, res) => {
  const { categorySlug, productSlug, id } = req.params;
  const productId = parseInt(id);

  // Tìm sản phẩm
  const product = productsData.find(
    (p) => p.id === productId && p.slug === productSlug
  );
  if (!product)
    return res.status(404).json({ message: "Sản phẩm không tồn tại" });

  // Tìm danh mục của sản phẩm
  const category = categoriesData.find((cat) => cat.id === product.categories);

  if (!category || category.slug !== categorySlug) {
    return res.status(404).json({ message: "Danh mục không hợp lệ" });
  }

  res.json({ product, category });
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findById(id).lean();
    if (!product)
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    res.json(product);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm", error);
    return res.status(500).json({ message: "Lỗi server", error });
  }
};

//chỉ dùng cho MongoDB

// exports.getDifferentProductsById = async (req, res) => {
//     try{
//         const sellerId = parseInt(req.params.sellerId);
//         const products = await productsData.aggregate([
//             {$match: {sellerId: sellerId}},
//             {$sample : {size: 4}}
//         ]);
//         return res.json(products);
//     }catch (error) {
//         console.error("Lỗi khi lấy sản phẩm",error);
//         return res.status(500).json({ message: "Lỗi server", error });
//     }
// }

exports.getDifferentProductsById = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const fillerdProducts = await Products.find({ sellerId });
    if (fillerdProducts.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm nào" });
    }
    const randomProducts = fillerdProducts
      .sort(() => Math.random() - 0.5) // Trộn mảng ngẫu nhiên
      .slice(0, 4); // Lấy 4 phần tử đầu tiên
    return res.json(randomProducts); // Trả về 4 sản phẩm ng��u nhiên của người bán
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm", error);
    return res.status(500).json({ message: "Lỗi server", error });
  }
};

exports.getSimilarProductById = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id, 10);
    const filteredProducts = await Products.find({
      "categories.id": categoryId,
    });

    const randomProducts = filteredProducts
      .sort(() => Math.random() - 0.5) // Trộn mảng ngẫu nhiên
      .slice(0, 4); // Lấy 4 phần tử đầu tiên
    return res.json(randomProducts); // Trả về 4 sản phẩm ng��u nhiên của người bán
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm tương tự", error);
    return res
      .status(500)
      .json({ message: "Lỗi server khi lấy sản phẩm tương tự", error });
  }
};

exports.getAllProductsByCategoryId = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id, 10);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const sort = req.query.sort || "newest";
    const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : 0;
    const maxPrice = req.query.maxPrice
      ? parseInt(req.query.maxPrice)
      : 1000000000;
    const skip = (page - 1) * limit; // Bỏ qua các sản phẩm đã duyệt ở trước
    const condition = req.query.conditions;
    const isFreeShip = req.query.isFreeShip;

    if (isNaN(categoryId)) {
      return res.status(404).json({ message: "ID danh mục không hợp lệ" });
    }
    const allowedStaticFilters = [
      "page",
      "limit",
      "sort",
      "minPrice",
      "maxPrice",
      "conditions",
      "isFreeShip",
    ];
    let hasDynamicFilters = false;

    const validateCategoryIds = getAllChildCategories(categoryId);
    const filter = {
      "categories.id": { $in: validateCategoryIds },
      price: { $gte: minPrice, $lte: maxPrice },
    };
    if (condition && condition != "all") {
      filter.condition = condition;
    }

    Object.keys(req.query).forEach((key) => {
      if (!allowedStaticFilters.includes(key)) {
        if (typeof req.query[key] === "string") {
          filter[`details.${key}`] = {
            $regex: new RegExp(req.query[key], "i"),
          }; // Không phân biệt hoa thường
        } else {
          filter[`details.${key}`] = req.query[key]; // Nếu là số thì giữ nguyên
        }
        hasDynamicFilters = true;
      }
    });

    if (isFreeShip === "freeship") {
      filter.isFreeShip = true;
    }

    let sortOption = { createdAt: -1 }; // Mặc định sắp xếp mới nhất
    if (sort === "price_asc") sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };
    if (sort === "free") filter.price = 0;

    const products = await Products.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);
    const totalProducts = await Products.countDocuments(filter);

    if (!products)
      return res
        .status(404)
        .json({ message: "Sản phẩm thuộc danh mục không tồn tại" });
    return res.json({
      products,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      page,
    }); // Trả về tất cả sản phẩm theo danh mục
  } catch (error) {
    console.error("Lỗi khi lấy tất cả sản phẩm theo danh mục", error);
    return res.status(500).json({
      message: "Lỗi server khi lấy tất cả sản phẩm theo danh mục",
      error,
    });
  }
};

// post product Linh

exports.createProduct = async (req, res) => {
  const newProduct = await Products({
    sellerId: req.params.id,
    ...req.body,
  });
  try {
    const saveProduct = await newProduct.save();
    res
      .status(200)
      .json(await Products.findById(saveProduct._id).populate("addressId"));
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createTestProduct = async (req, res) => {
  try {
    const product = await exampleProduct.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getProductBySellerId = async (req, res) => {
  try {
    const product = await Products.aggregate([
      {
        $match: { sellerId: req.params.id }, // Lọc theo sellerId
      },
      {
        $lookup: {
          from: "infousers", // Tên collection của InfoUser trong MongoDB (chữ thường, số nhiều)
          localField: "sellerId",
          foreignField: "userId",
          as: "sellerInfo",
        },
      },
      {
        $unwind: "$sellerInfo", // Giải nén nếu chỉ có một kết quả
      },
      {
        $lookup: {
          from: "addressinfousers", // Tên collection của AddressInfoUser (chữ thường, số nhiều)
          localField: "addressId",
          foreignField: "_id",
          as: "addressInfo",
        },
      },
      {
        $unwind: "$addressInfo", // Giải nén địa chỉ (nếu có)
      },
      {
        $sort: { createdAt: -1 }, // Sắp xếp theo thời gian tạo
      },
    ]);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getSearchProducts = async (req, res) => {
  const { searchValue, cateValue, dateValue, statusValue } = req.query;

  try {
    // Tạo bộ lọc tìm kiếm
    const filter = {};

    // 🔎 Tìm kiếm theo tên sản phẩm (dùng regex để không phân biệt hoa thường)
    if (searchValue) {
      filter.name = { $regex: searchValue, $options: "i" };
    }

    // 🔎 Lọc theo danh mục (dùng ID)
    if (cateValue) {
      filter["categories.id"] = cateValue; // Chuyển đổi sang số nguyên
    }

    // 🔎 Lọc theo ngày tạo (tìm trong khoảng thời gian)
    if (dateValue) {
      const startDate = new Date(dateValue);
      const endDate = new Date(dateValue);
      endDate.setHours(23, 59, 59, 999); // Lấy hết giờ trong ngày

      filter.createdAt = { $gte: startDate, $lte: endDate };
    }

    // 🔎 Lọc theo trạng thái (tuỳ theo định nghĩa trạng thái của bạn)
    if (statusValue) {
      filter.condition = statusValue;
    }

    // 👉 Truy vấn MongoDB theo bộ lọc
    const products = await Products.find(filter).sort({ createdAt: -1 });

    if (products.length !== 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "Không có dữ liệu." });
    }
  } catch (error) {
    console.error("Lỗi khi tìm kiếm sản phẩm:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Lỗi khi lấy sản phẩm:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Products.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product has been deleted successfully." });
  } catch (error) {
    res.status(500).json(error);
  }
};