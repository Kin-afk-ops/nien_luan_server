const mongoose = require("mongoose");

const AttributeSchema = new mongoose.Schema(
  {
    attributeId: {
      type: Number,
      required: true,
      unique: true,
    },
    label: {
      type: String,
      required: true,
    },
    listDataTypes: [
      {
        id: {
          type: Number,
          required: true,
        },
        label: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        options: [
          {
            id: {
              type: Number,
              required: true,
            },
            value: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CataAttributeDetail", AttributeSchema);
