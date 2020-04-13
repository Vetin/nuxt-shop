const Order = require("../models/order.model");
const User = require("../");

module.exports.create = async (req, res) => {
  try {
    const { userId, price, products } = req.body;
    const order = new Order({
      price,
      products,
      userId
    });
    await order.save();
    res.status(201).json(order._id);
  } catch (error) {
    console.log(error);
  }
};

module.exports.get = async (req, res) => {
  try {
    const userId = req.params.id;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json(order);
  } catch (error) {
    console.log(error);
  }
};

module.exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { track, status } = req.body;
    const order = await Order.findById(id);
    order.status = status;
    order.track = track;
    res.json({ message: "Заказ успешно обновлен" });
  } catch (error) {
    console.log(error);
  }
};
