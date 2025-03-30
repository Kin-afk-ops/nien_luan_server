const mongoose = require('mongoose');
const slugify = require("slugify");

const CategorySchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
    },
    parentId: {
        type: Number,
        default: null,
    },
    attributeId: {
        type: String,
    }

}, { timestamps: true });

CategorySchema.pre("save", async function (next) {
    // Tạo slug nếu chưa có
    if (!this.slug) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
  
    // Nếu chưa có id thì tạo id mới dựa trên số lượng danh mục hiện tại
    if (!this.id) {
      const lastCategory = await mongoose.model("Category").findOne().sort({ id: -1 }); // Lấy danh mục có id lớn nhất
      this.id = lastCategory ? lastCategory.id + 1 : 1; // Nếu có danh mục, lấy id lớn nhất + 1, nếu không thì là 1001
    }
  
    next();
  });

module.exports = mongoose.model('Category', CategorySchema);