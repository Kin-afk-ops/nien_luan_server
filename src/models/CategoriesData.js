const categoriesData = [
<<<<<<< HEAD
  { id: 1, name: "Đồ cũ", slug: "category-1", parentId: null },
  { id: 2, name: "Sách", slug: "mua-ban-sach", parentId: 1 },
  { id: 3, name: "Sách tiếng Việt", slug: "category-3", parentId: 2 },
  {
    id: 4,
    name: "Sách công giáo",
    slug: "mua-ban-sach-cong-giao",
    parentId: 3,
  },
  { id: 5, name: "Sách nấu ăn", slug: "category-5", parentId: 2 },
  { id: 6, name: "Sách ma thuật", slug: "sach-ma-thuat", parentId: 2 },
  { id: 7, name: "Sách phép", slug: "sach-phep", parentId: 2 },
  { id: 8, name: "Đồ điện tử", slug: "do-dien-tu", parentId: 1 },
  {
    id: 9,
    name: "Điện thoại",
    slug: "dien-thoai",
    parentId: 8,
    attributeId: 1003,
  },
  { id: 10, name: "Laptop", slug: "laptop", parentId: 8, attributeId: 1002 },
  { id: 11, name: "Máy ảnh", slug: "may-anh", parentId: 8 },
  { id: 12, name: "Máy tính bảng", slug: "may-tinh-bang", parentId: 8 },
  { id: 13, name: "Đồ gia dụng", slug: "do-gia-dung", parentId: 1 },
  { id: 14, name: "Tủ lạnh", slug: "tu-lanh", parentId: 13 },
  { id: 15, name: "Máy giặt", slug: "may-giat", parentId: 13 },
  { id: 16, name: "Đồ chơi", slug: "do-choi", parentId: 1 },
  { id: 17, name: "Đồ chơi trẻ em", slug: "do-choi-tre-em", parentId: 16 },
  {
    id: 18,
    name: "Đồ chơi người lớn",
    slug: "do-choi-nguoi-lon",
    parentId: 16,
  },
  {
    id: 19,
    name: "Đồ chơi công nghệ",
    slug: "do-choi-cong-nghe",
    parentId: 16,
  },
  { id: 20, name: "Đồ chơi ô tô", slug: "do-choi-o-to", parentId: 16 },
  { id: 21, name: "Đồ chơi xe máy", slug: "do-choi-xe-may", parentId: 16 },
  { id: 22, name: "Đồ chơi xe đạp", slug: "do-choi-xe-dap", parentId: 16 },
  { id: 23, name: "Đồ chơi máy bay", slug: "do-choi-may-bay", parentId: 16 },
  { id: 24, name: "Đồ chơi tàu hỏa", slug: "do-choi-tau-hoa", parentId: 16 },
  { id: 25, name: "Đồ chơi tàu thủy", slug: "do-choi-tau-thuy", parentId: 16 },
  {
    id: 26,
    name: "Đồ chơi tàu du lịch",
    slug: "do-choi-tau-du-lich",
    parentId: 16,
  },
  {
    id: 27,
    name: "Đồ chơi tàu vũ trụ",
    slug: "do-choi-tau-vu-tru",
    parentId: 16,
  },
  { id: 28, name: "Sách ma thuật đen", slug: "sach-ma-thuat-den", parentId: 2 },
  { id: 29, name: "Đồ cho nam", slug: "do-cho-nam", parentId: 2 },
  { id: 30, name: "Đồ cho nữ", slug: "do-cho-nu", parentId: 2 },
  { id: 31, name: "Đồ cho trẻ em", slug: "do-cho-tre-em", parentId: 2 },
  { id: 32, name: "Đồ cho người già", slug: "do-cho-nguoi-gia", parentId: 2 },
];

module.exports = categoriesData;
=======
  { id: 1, name: 'Đồ cũ', slug: 'category-1', parentId: null }, 
  { id: 2, name: 'Sách', slug: 'mua-ban-sach', parentId: 1 },
  { id: 3, name: 'Sách tiếng Việt', slug: 'category-3', parentId: 2 },
  { id: 4, name: 'Sách công giáo', slug: 'mua-ban-sach-cong-giao', parentId: 3 },
  { id: 5, name: 'Sách nấu ăn', slug: 'category-5', parentId: 2 },
  { id: 6, name: 'Sách ma thuật', slug: 'sach-ma-thuat', parentId: 2 },
  { id: 7, name: 'Sách phép', slug: 'sach-phep', parentId: 2 },
  { id: 8, name: 'Đồ điện tử', slug: 'do-dien-tu', parentId: 1 },
  { id: 9, name: 'Điện thoại', slug: 'dien-thoai', parentId: 8, attributeId: 1003 },
  { id: 10, name: 'Laptop', slug: 'laptop', parentId: 8, attributeId: 1002 },
  { id: 11, name: 'Máy ảnh', slug: 'may-anh', parentId: 8 },
  { id: 12, name: 'Máy tính bảng', slug: 'may-tinh-bang', parentId: 8 },
  { id: 13, name: 'Đồ gia dụng', slug: 'do-gia-dung', parentId: 1 },
  { id: 14, name: 'Tủ lạnh', slug: 'tu-lanh', parentId: 13 },
  { id: 15, name: 'Máy giặt', slug: 'may-giat', parentId: 13 },
  { id: 16, name: 'Đồ chơi', slug: 'do-choi', parentId: 1 },
  { id: 17, name: 'Đồ chơi trẻ em', slug: 'do-choi-tre-em', parentId: 16 },
  { id: 18, name: 'Đồ chơi người lớn', slug: 'do-choi-nguoi-lon', parentId: 16 },
  { id: 19, name: 'Đồ chơi công nghệ', slug: 'do-choi-cong-nghe', parentId: 16 },
  { id: 20, name: 'Đồ chơi ô tô', slug: 'do-choi-o-to', parentId: 16 },
  { id: 21, name: 'Đồ chơi xe máy', slug: 'do-choi-xe-may', parentId: 16 },
  { id: 22, name: 'Đồ chơi xe đạp', slug: 'do-choi-xe-dap', parentId: 16 },
  { id: 23, name: 'Đồ chơi máy bay', slug: 'do-choi-may-bay', parentId: 16 },
  { id: 24, name: 'Đồ chơi tàu hỏa', slug: 'do-choi-tau-hoa', parentId: 16 },
  { id: 25, name: 'Đồ chơi tàu thủy', slug: 'do-choi-tau-thuy', parentId: 16 },
  { id: 26, name: 'Đồ chơi tàu du lịch', slug: 'do-choi-tau-du-lich', parentId: 16 },
  { id: 27, name: 'Đồ chơi tàu vũ trụ', slug: 'do-choi-tau-vu-tru', parentId: 16 },
  {id: 28, name: "Quần áo", slug: "quan-ao", parentId: 1},
  {id: 29, name: "Sách ma thuật đen", slug: "sach-ma-thuat-den", parentId: 28},
  {id: 30, name: "Đồ cho nam", slug:"do-cho-nam", parentId: 28},
  {id: 31, name: "Đồ cho nữ", slug:"do-cho-nu", parentId: 28},
  {id: 32, name: "Đồ cho trẻ em", slug:"do-cho-tre-em", parentId: 28},
  {id: 33, name: "Đồ cho người già", slug:"do-cho-nguoi-gia", parentId: 28},
  
]

module.exports = categoriesData;

>>>>>>> a45de9b354a53660009e00fecde8bf1775963d0d
