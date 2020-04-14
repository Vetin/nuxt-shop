const Order = require("../models/order.model");
const Product = require("../models/product.model");
const keys = require("../keys/index");
const TelegramBot = require("node-telegram-bot-api");
const Agent = require("socks5-https-client/lib/Agent");

const bot = new TelegramBot(keys.TELEGRAM_BOT_TOKEN, {
  polling: true,
  request: {
    agentClass: Agent,
    agentOptions: {
      socksHost: "96.113.176.101",
      socksPort: "1080"
    }
  }
});

module.exports.create = async (req, res) => {
  try {
    const { userId, price, products, address, phone, flat, name } = req.body;
    const order = new Order({
      price,
      products,
      userId
    });
    // products.forEach(prod => {
    //   const product = await Product.findById(product._id);
    //   product.count -= prod.count;
    //   await product.save();
    // })

    await order.save();
    let fields = [
      "Поступил новый заказ!",
      `ФИО: ${name}`,
      `Адрес доставки: ${address}, ${flat}`,
      `Телефон: ${phone}`,
      `Подтвердить заказ: ${keys.SITE_URL}/complete/order/${order._id}`
    ];
    let msg = "";
    fields.forEach(field => {
      msg += field + "\n";
    });
    await bot.sendMessage(keys.TELEGRAM_CHAT_ID, msg);
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
    const order = await Order.findById(id);
    order.track = req.body.track;
    order.status = "Отправлен";
    await order.save();
    console.log(order);
    res.json({ message: "Заказ успешно обновлен" });
  } catch (error) {
    console.log(error);
  }
};
