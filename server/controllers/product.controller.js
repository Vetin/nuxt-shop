const Product = require("../models/product.model");
const isAdminFunc = require("../middleware/isAdmin");

module.exports.add = async (req, res) => {
  const {
    title,
    category,
    color,
    imgSrc,
    price,
    sizes,
    count,
    userId
  } = req.body;
  console.log(userId);
  if (isAdminFunc(userId)) {
    try {
      const product = new Product({
        title,
        category,
        price,
        imgSrc,
        sizes,
        color,
        count
      });
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports.update = async (req, res) => {
  if (isAdminFunc(req.body.userId)) {
    try {
      const { title, price, category, imgSrc, sizes, count } = req.body;
      let pretender = await Product.findById(req.params.id);
      if (pretender) {
        pretender.title = title;
        pretender.price = price;
        pretender.category = category;
        pretender.imgSrc = imgSrc;
        pretender.sizes = sizes;
        pretender.count = count;
        await pretender.save();
        res.json(pretender);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports.remove = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.status(204).json("Товар успешно удален");
  } catch (error) {
    console.log(error);
  }
};
