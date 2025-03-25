const categoriesData = require("../models/CategoriesData");
const cateData = require("../models/CateData");
const {getAllChildCategoriesInfo} = require('../services/categoryServices');
const AttributeDetail = require("../models/CateAttributeDetail");
const Category = require("../models/Category");

exports.getParentCategories = (req, res) => {
    const categoryId = parseInt(req.params.id);
    if(isNaN(categoryId)) {
        return res.status(400).json({ message: "ID không hợp lệ" });
    }

    let category = categoriesData.find((cat) => cat.id === categoryId);
    let parents = [];
    parents.unshift(category);

    while(category && category.parentId) {
        category = categoriesData.find((cat) => cat.id === category.parentId);

        if(category) {
            parents.unshift(category);
        }
    }
    res.json(parents);
}

exports.getCategoryDataBySlug = async (req, res) => {
    try{
        const categorySlug = req.params.slug;
        const category = categoriesData.find(cat => cat.slug === categorySlug);
        if(!category) return res.status(404).json({ message: "Danh mục không tồn tại" });
        return res.json(category);  // Trả về thông tin danh mục
    }catch(e){
        console.error("Lỗi khi lấy thông tin danh mục", e);
        return res.status(500).json({ message: "Lỗi server khi lấy thông tin danh mục", error });
    }
}

exports.getListCategories = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const allChildCategories = getAllChildCategoriesInfo(id);
        return res.json(allChildCategories);

    }catch(error){
        console.error("Lỗi khi lấy danh sách danh mục", error);
        return res.status(500).json({ message: "Lỗi server khi lấy danh sách danh mục", error });
    }
}

exports.getAttributesOfCategory = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const category =  categoriesData.find(cat => cat.id === id);
        const attributeList =  cateData.find((attr) => attr.attributeId === category.attributeId);
        if(!attributeList) return res.status(404).json({ message: "Không tìm thấy thông tin danh mục" });
        return res.json(attributeList);
    }catch(error) {
        console.error("Lỗi khi lấy thông tin danh mục ở category controller", error);
        return res.status(500).json({ message: "Lỗi server khi lấy thông tin danh mục", error });
    }
}

exports.addCategoryAttributeDetail = async (req, res) => {
    try {
        const cateAttributes = AttributeDetail(req.body);
        cateAttributes.save();
        res.status(201).json({ message: 'Thuộc tính đã được thêm!', attribute });
    }catch(error) {
        console.error("Lỗi khi thêm danh mục", error);
        return res.status(500).json({ message: "Lỗi server khi thêm danh mục", error });
    }
}

exports.addCategory = async (req, res) => {
    try {
        const category = Category(req.body);
        category.save();
        res.status(201).json({ message: 'Danh mục đã được thêm!', category });
    } catch(error) {
        console.error("Lỗi khi thêm danh mục", error);
        return res.status(500).json({ message: "Lỗi server khi thêm danh mục", error });
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        // const categories = await categoriesData.find();
        res.json(categoriesData);
    } catch(error) {
        console.error("L��i khi lấy tất cả danh mục", error);
        return res.status(500).json({ message: "L��i server khi lấy tất cả danh mục", error });
    }
}

exports.getAllCategoriesAttributes = async (req, res) => {
    try {
        // const categoriesAttributes = await AttributeDetail.find();
        res.json(cateData);
    } catch(error) {
        console.error("L��i khi lấy tất cả thông tin danh mục", error);
        return res.status(500).json({ message: "L��i server khi lấy tất cả thông tin danh mục", error });
    }
}