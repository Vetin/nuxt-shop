const path = require("path");
const multer = require("multer");

const pathToImg = path.resolve(__dirname, "../../static/images");
const isMimeCorrect = (mime) =>
  mime === "image/png" || mime === "image/jpg" || mime === "image/jpeg";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, pathToImg);
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (isMimeCorrect(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const fileSize = 1024 * 1024 * 5;
module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize,
  },
});
