const productsData = require("../models/ProductTest");
const categoriesData = require("../models/CategoriesData");
const { getAllChildCategories } = require("../services/categoryServices");

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

exports.getProductById = (req, res) => {
  const { id } = req.params;
  const productId = parseInt(id);

  const product = productsData.find((p) => p.id === productId);
  if (!product)
    return res.status(404).json({ message: "Sản phẩm không tồn tại" });
  res.json(product);
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
    const sellerId = parseInt(req.params.sellerId, 10);
    const fillerdProducts = productsData.filter((p) => p.sellerId === sellerId);
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
    const fillerdProducts = productsData.filter(
      (p) => p.categoryId === categoryId
    );
    const randomProducts = fillerdProducts
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
    if (isNaN(categoryId)) {
      return res.status(404).json({ message: "ID danh mục không hợp lệ" });
    }

    const validateCategoryIds = getAllChildCategories(categoryId);
    let products = productsData.filter((p) =>
      validateCategoryIds.includes(p.categoryId)
    );

    products = products.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );
    if (req.query.maxPrice) {
      console.log("Max price ", maxPrice);
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
        products = products.filter((p) => p.price === 0);
        break;
      default:
        products.sort((a, b) => b.id - a.id); // Mặc định là "newest"
        break;
    }
    const totalProducts = products.length;
    const paginatedProduct = products.slice(skip, skip + limit);

    if (!products)
      return res
        .status(404)
        .json({ message: "Sản phẩm thuộc danh mục không tồn tại" });
    return res.json({
      products: paginatedProduct,
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
