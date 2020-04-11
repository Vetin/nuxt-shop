/* Import from libs & fms */
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

/* Import from locale files */
const passportStrategy = require("./middleware/passport-strategy");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const app = express();
const keys = require("./keys");

/* Init */
mongoose
  .connect(keys.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo db connected"))
  .catch((error) => console.log(error));
app.use(passport.initialize());
passport.use(passportStrategy);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

module.exports = app;
