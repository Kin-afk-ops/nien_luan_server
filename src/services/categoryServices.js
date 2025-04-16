const categoriesData  = require('../models/CategoriesData');
const Category = require("../models/Category");

const categoryMap = {};
const categoryCache = new Map(); // Lưu cache kết quả tìm danh mục con

// Tạo categoryMap chỉ một lần khi server khởi động
let initialized = false;
async function initializeCategoryMap() {
    const categoriesData = await Category.find();
    categoryCache.clear(); // reset cache nếu reload

    // Reset map
    Object.keys(categoryMap).forEach(key => delete categoryMap[key]);

    categoriesData.forEach(category => {
        categoryMap[category.id] = { ...category._doc, children: [] };
    });

    categoriesData.forEach(category => {
        if (category.parentId !== null && categoryMap[category.parentId]) {
            categoryMap[category.parentId].children.push(categoryMap[category.id]);
        }
    });

    initialized = true;
}

// Hàm tìm danh mục con với cache
exports.getAllChildCategories = async (id) => {
    if (!initialized) {
        await initializeCategoryMap();
    }

    if (categoryCache.has(id)) return categoryCache.get(id);

    const result = [];
    const queue = [id];

    while (queue.length > 0) {
        const currentId = queue.shift();
        result.push(currentId);

        if (categoryMap[currentId]?.children) {
            queue.push(...categoryMap[currentId].children.map(child => child.id));
        }
    }

    categoryCache.set(id, result);
    return result;
};

exports.getAllChildCategoriesInfo = async (id) => {
    if (!initialized) {
        await initializeCategoryMap();
    }

    if (!id || !categoryMap[id]) return [];
    return categoryMap[id].children || [];
};