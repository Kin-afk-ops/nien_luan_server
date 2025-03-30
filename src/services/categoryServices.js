const categoriesData  = require('../models/CategoriesData');

const categoryMap = {};
const categoryCache = new Map(); // Lưu cache kết quả tìm danh mục con

// Tạo categoryMap chỉ một lần khi server khởi động
categoriesData.forEach(category => {
    categoryMap[category.id] = { ...category, children: [] };
});

// Xây dựng quan hệ cha - con
categoriesData.forEach(category => {
    if (category.parentId !== null && categoryMap[category.parentId]) {
        categoryMap[category.parentId].children.push(categoryMap[category.id]);
    }
});

// Hàm tìm danh mục con với cache
exports.getAllChildCategories = (id) => {
    if (categoryCache.has(id)) return categoryCache.get(id); // Trả về từ cache nếu có

    const result = [];
    const queue = [id];

    while (queue.length > 0) {
        const currentId = queue.shift();
        result.push(currentId);

        if (categoryMap[currentId]?.children) {
            queue.push(...categoryMap[currentId].children.map(child => child.id));
        }
    }

    categoryCache.set(id, result); // Lưu vào cache
    return result;
};

exports.getAllChildCategoriesInfo = (id) => {
    if (!id || !categoryMap[id]) return []; // Nếu id không hợp lệ, trả về mảng rỗng

    return categoryMap[id].children || []; // Trả về danh sách con trực tiếp
}