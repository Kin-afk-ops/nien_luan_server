const categoriesData = [
  { id: 1, name: 'Đồ cũ', slug: 'category-1', parentId: null }, 
  { id: 2, name: 'Sách', slug: 'category-2', parentId: 1 },
  { id: 3, name: 'Sách tiếng Việt', slug: 'category-3', parentId: 2 },
  { id: 4, name: 'Sách công giáo', slug: 'mua-ban-sach-cong-giao', parentId: 3 }
]

module.exports = categoriesData;