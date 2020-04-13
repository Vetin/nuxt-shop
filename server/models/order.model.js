const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  products: {
    type: Array,
    required: true
  },
  status: {
    type: String,
    default: "Оформляется",
  },
  price: {
    type: Number,
    required: true
  },
  track: {
    type: String,
    default: '-'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
});

module.exports = model("orders", orderSchema);
