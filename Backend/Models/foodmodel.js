const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String
    }
  },
  { versionKey: false }
);

const ProductModel = mongoose.model('product', productSchema);

module.exports = {ProductModel};
