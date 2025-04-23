const categoriesData = require("../models/CategoriesData");
const cateData = require("../models/CateAttributeDetail");
const { getAllChildCategoriesInfo } = require("../services/categoryServices");
const AttributeDetail = require("../models/CateAttributeDetail");
const Category = require("../models/Category");
const Products = require("../models/Products");

exports.getParentCategories = async(req, res) => {
  const categoryId = parseInt(req.params.id);
  if (isNaN(categoryId)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  let category = await Category.findOne({ id: categoryId });
  let parents = [];
  parents.unshift(category);

  while (category && category.parentId) {
    category = await Category.findOne({ id: category.parentId });
    if (category) {
      parents.unshift(category);
    }
  }
  res.json(parents);
};

exports.getCategoryDataBySlug = async (req, res) => {
  try {
    const categorySlug = req.params.slug;
    const category = await Category.findOne({slug: categorySlug});
    if (!category)
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    return res.json(category); // Trả về thông tin danh mục
  } catch (e) {
    console.error("Lỗi khi lấy thông tin danh mục", e);
    return res
      .status(500)
      .json({ message: "Lỗi server khi lấy thông tin danh mục", e });
  }
};

exports.getListCategories = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const allChildCategories = await getAllChildCategoriesInfo(id);
    return res.json(allChildCategories);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách danh mục", error);
    return res
      .status(500)
      .json({ message: "Lỗi server khi lấy danh sách danh mục", error });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findOne({id: id});
    if(!category) {
      return res.status(404).json({message: "Không tìm thấy danh mục"});
    }
    return res.json(category);

  }catch(error) {
    console.error("Lỗi khi lấy danh mục theo ID", error);
    return res.status(500).json({ message: "Lỗi server khi lấy danh mục", error });
  }

}

exports.getAttributesOfCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findOne({ id: id });
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
    const attributeList = await AttributeDetail.findOne({ attributeId: category.attributeId });
    if (!attributeList) {
      return res.status(404).json({ message: "Không tìm thấy thông tin thuộc tính" });
    }

    return res.json(attributeList);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin danh mục ở category controller", error);
    return res.status(500).json({ message: "Lỗi server khi lấy thông tin danh mục", error });
  }
};


exports.addCategoryAttributeDetail = async (req, res) => {
  try {
    const count = await AttributeDetail.countDocuments();
    const newAttributes = new AttributeDetail({
      attributeId: count + 1,
      label: req.body.label,
      listDataTypes: req.body.listDataTypes,
    });
    // const cateAttributes = AttributeDetail(req.body);
    newAttributes.save();
    res
      .status(201)
      .json({ message: "Thuộc tính đã được thêm!", newAttributes });
  } catch (error) {
    console.error("Lỗi khi thêm danh mục", error);
    return res
      .status(500)
      .json({ message: "Lỗi server khi thêm danh mục", error });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const category = Category(req.body);
    category.save();
    res.status(201).json({ message: "Danh mục đã được thêm!", category });
  } catch (error) {
    console.error("Lỗi khi thêm danh mục", error);
    return res
      .status(500)
      .json({ message: "Lỗi server khi thêm danh mục", error });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().collation({locale: 'vi', strength: 1}).sort({name: 1});
    res.json(categories);
  } catch (error) {
    console.error("L��i khi lấy tất cả danh mục", error);
    return res
      .status(500)
      .json({ message: "Lỗi server khi lấy tất cả danh mục", error });
  }
};

exports.getAllCategoriesAttributes = async (req, res) => {
  try {
    const categoriesAttributes = await AttributeDetail.find();
    res.json(categoriesAttributes);
  } catch (error) {
    console.error("L��i khi lấy tất cả thông tin danh mục", error);
    return res.status(500).json({
      message: "L��i server khi lấy tất cả thông tin danh mục",
      error,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category)
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    res.json(category);
  } catch (error) {
    console.error("L��i khi cập nhật danh mục", error);
    return res
      .status(500)
      .json({ message: "L��i server khi cập nhật danh mục", error });
  }
};

exports.updateCategoriesAttributes = async (req, res) => {
  try {
    const { attributeId } = req.params; // Lấy attributeId từ URL
    const updatedData = req.body; // Dữ liệu cần cập nhật

    // Tìm và cập nhật dựa trên attributeId
    const categoriesAttributes = await AttributeDetail.findOneAndUpdate(
      { attributeId: attributeId }, // Điều kiện tìm kiếm
      updatedData,
      { new: true } // Trả về dữ liệu mới sau khi cập nhật
    );

    if (!categoriesAttributes) {
      return res
        .status(404)
        .json({ message: "Thông tin danh mục không tồn tại" });
    }

    res.json(categoriesAttributes);
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin danh mục", error);
    return res
      .status(500)
      .json({ message: "Lỗi server khi cập nhật thông tin danh mục", error });
  }
};

exports.getAttributeByCategoryId = async (req, res) => {
  try{
    const categoryId = req.params.id;
    const category = await Category.findOne({id: categoryId});
    const attribute = await AttributeDetail.findOne({ attributeId: category.attributeId });
    if(!attribute) return res.status(404).json({ message: "Thông tin danh mục không tồn tại" });
    res.json(attribute);

  }catch(error) {
    console.error("Lỗi khi lấy thông tin danh mục theo ID", error);
    return res.status(500).json({ message: "Lỗi server khi lấy thông tin danh mục", error });
  }
}

exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedData = req.body; // Dữ liệu cần cập nhật

    // Tìm và cập nhật dựa trên categoryId
    const updatedCategory = await Category.findOneAndUpdate(
      { id: categoryId }, // Điều kiện tìm kiếm
      updatedData,
      { new: true } // Trả về dữ liệu mới sau khi cập nhật
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }

    res.json(updatedCategory);
  } catch (error) {
    console.error("Lỗi khi cập nhật danh mục", error);
    return res.status(500).json({ message: "Lỗi server khi cập nhật danh mục", error });
  }
}

exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findOneAndDelete({ id: categoryId });
    if(!deletedCategory) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }

    await Products.updateMany(
      {categoryId: categoryId}, // Điều kiện tìm kiếm
      { $set: { categoryId: 1 } } // Cập nhật trường categoryId thành null
    )
    await Category.updateMany (
      { parentId: categoryId }, // Điều kiện tìm kiếm
      { $set: { parentId: 1 } } // Cập nhật trường parentId thành null
    )
    res.json({ message: "Xóa danh mục thành công, đã cập nhật sản phẩm và các danh mục con", deletedCategory });
  }catch(error) {
    console.error("Lỗi khi xóa danh mục", error);
    return res.status(500).json({ message: "Lỗi server khi xóa danh mục", error });
  }
}
