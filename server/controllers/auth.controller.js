const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const User = require("../models/user.model");
const keys = require("../keys");
const isAdminFunc = require("../middleware/isAdmin");

module.exports.login = async (req, res) => {
  try {
    const pretender = await User.findOne({ login: req.body.login });
    if (pretender) {
      const isValid = await bcrypt.compare(
        req.body.password,
        pretender.password
      );
      if (isValid) {
        const token = JWT.sign(
          {
            login: pretender.login,
            userId: pretender._id
          },
          keys.JWT,
          { expiresIn: "10 years" }
        );
        res.json({ token });
      } else {
        res.status(401).json("Данные введены некорректно");
      }
    } else {
      res.status(404).json("Пользователь не найден ×");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.createUser = async (req, res) => {
  let { login, password, email, phone } = req.body;
  try {
    const isExist = await User.findOne({ login });
    if (!isExist) {
      const isInvalidEmail = await User.findOne({ email });
      if (!isInvalidEmail) {
        password = await bcrypt.hash(password, 10);
        const user = new User({
          login,
          password,
          email,
          phone
        });
        await user.save();
        res.status(201).json("Регистрация прошла успешно");
      } else {
        res.status(409).json("Пользователь с указанной почтой уже существует");
      }
    } else {
      res.status(409).json("Пользователь с указанными данными логином");
    }
  } catch (error) {
    console.log(error);
  }
};
