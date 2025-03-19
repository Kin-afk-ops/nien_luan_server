const productsData = require("../models/ProductTest");
const categoriesData = require("../models/CategoriesData");
const Products = require("../models/Products");
const { getAllChildCategories } = require("../services/categoryServices");

const exampleProduct = new Products({
  name: "Dell Latitus S2025 ProMax",
  sellerId: "10009",
  categories: {
    id: 10,
    name: "laptop",
    slug: "laptop",
  },
  slug: "dell-latitude",
  condition: "new",
  quantity: 10,
  price: 10000000,
  description: "Laptop Dell Latitude",
  details: {
    brand: "Dell",
    ram: "4GB",
    memory: "1TB",
    cpu: "Intel Core i5",
    os: "Windows",
    battery: "5h",
    color: "Đỏ",
    size: "14 inch",
  },
  images: {
    id: 1,
    url: [
      "https://lamkhanh.com/wp-content/uploads/2022/02/laptop-dell-7480-300x300.jpg",
    ],
  },
  discount: 0,
  isFreeShip: true,
  address: {
    province: "Hà Nội",
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
    const limit = parseInt(req.query.limit) || 48;
    const sort = req.query.sort || "newest";
    const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : 0;
    const maxPrice = req.query.maxPrice
      ? parseInt(req.query.maxPrice)
      : 1000000000;
    const skip = (page - 1) * limit; // Bỏ qua các sản phẩm đã duyệt ở trước
    const condition = req.query.conditions;
    const size = req.query.size;

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
    console.log(req.query);

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
      totalPages: Math.ceil(products.length / limit),
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
    res.status(200).json(saveProduct);
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
    const product = await Products.find({ sellerId: req.params.id });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getProductByCategories = async (req, res) => {
  try {
    const product = await Products.find({ "categories.id": req.params.id });

    if (product.length !== 0) {
      res.status(200).json(product);
    } else {
      res.status(403).json("Không có dữ liệu");
    }
  } catch (error) {
    res.status(500).json(error);
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
