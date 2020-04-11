const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    minlength: 11,
    maxlength: 12,
    unique: true,
  },
});

module.exports = model("users", userSchema);
