const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imgSrc: {
    type: Array,
    required: true
  },
  sizes: {
    type: Array,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
});

module.exports = model("products", productSchema);
