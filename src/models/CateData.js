const mongoose = require("mongoose");


const CateData = new mongoose.Schema(
  {
    cateId: {
      type: String,
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("catedata", CateData);


const cateData = [
  {
    attributeId: 1001,
    label: "quần áo",
    listDataType: [
      {id: 1, label: "Kích thước", name: "size", options: [
        {id: 1, value: "S"},
        {id: 2, value: "M"},
        {id: 3, value: "L"},
        {id: 4, value: "XL"},
        {id: 5, value: "XXL"}
      ]}
    ]
  },
  {
    attributeId: 1002,
    label:"laptop",
    listDataType: [
      {id: 1, label: "Kích thước", name: "size", options: [
        {id: 1, value: "13 inch"},
        {id: 2, value: "14 inch"},
        {id: 3, value: "15 inch"},
        {id: 4, value: "16 inch"},
        {id: 5, value: "17 inch"}
      ]},
      {id: 2, label: "Màu sắc", name: "color", options: [
        {id: 1, value: "Đen"},
        {id: 2, value: "Trắng"},
        {id: 3, value: "Xanh"},
        {id: 4, value: "Đỏ"},
        {id: 5, value: "Vàng"}
      ]},
      {id: 3, label: "Hệ điều hành", name: "os", options: [
        {id: 1, value: "Windows"},
        {id: 2, value: "MacOS"},
        {id: 3, value: "Linux"},
        {id: 4, value: "Android"},
        {id: 5, value: "IOS"}
      ]},
      {id: 4, label: "Lượng pin", name: "battery", options: [
        {id: 1, value: "1h"},
        {id: 2, value: "2h"},
        {id: 3, value: "3h"},
        {id: 4, value: "4h"},
        {id: 5, value: "5h"}
      ]},
      {id: 5, label: "Dung lượng", name: "capacity", options: [
        {id: 1, value: "128GB"},
        {id: 2, value: "256GB"},
        {id: 3, value: "512GB"},
        {id: 4, value: "1TB"},
      ]},
      {id: 6, label: "RAM", name: "ram", options: [
        {id: 1, value: "4GB"},
        {id: 2, value: "8GB"},
        {id: 3, value: "16GB"},
        {id: 4, value: "32GB"},
        {id: 5, value: "64GB"}
      ]},
      {id: 7, label: "Hãng", name:"brand", options: [
        {id: 1, value: "Apple"},
        {id: 2, value: "Dell"},
        {id: 3, value: "HP"},
        {id: 4, value: "Asus"},
        {id: 5, value: "Lenovo"}
      ]},
      {id: 8, label: "CPU", name: "cpu", options: [
        {id: 1, value: "Intel Core i5"},
        {id: 2, value: "Intel Core i7"},
        {id: 3, value: "AMD Ryzen 5"},
        {id: 4, value: "AMD Ryzen 7"},
        {id: 5, value: "AMD Ryzen 9"}
    ]}
    ]
  },
  {
    attributeId: 1003,
    label: "điện thoại",
    listDataType: [
      {id: 1, label: "Dung lượng", name: "memory", options: [
        {id: 1, value: "128GB"},
        {id: 2, value: "256GB"},
        {id: 3, value: "512GB"},
      ]},
      {id: 2, label: "Màu sắc", name: "color", options: [
        {id: 1, value: "Đen"},
        {id: 2, value: "Trắng"},
        {id: 3, value: "Xanh"},
        {id: 4, value: "Đỏ"},
        {id: 5, value: "Vàng"}
      ]},
]},
]

module.exports = cateData;
