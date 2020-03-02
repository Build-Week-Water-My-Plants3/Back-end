const images = require("multer");
const uri = require("datauri");
const path = require("path");

const storage = images.memoryStorage();

const filters = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const imageUpload = images({
  storage: storage,
  fileFilter: filters,
  limits: {
    fileSize: 1024 * 1024 * 10
  }
}).single("photo");

const dUri = new uri();

const dataUri = req => {
  return dUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
};

module.exports = {
  imageUpload,
  dataUri
};
