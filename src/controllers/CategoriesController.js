const categoriesData = require("../models/CategoriesData");

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