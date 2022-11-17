const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "PIMG" +
        "-" +
        Date.now() +
        Math.round(Math.random() * 100000) +
        "." +
        file.mimetype.split("/")[1]
    );
    console.log(file);
  },
});

exports.multerUpload = multer({ storage });
