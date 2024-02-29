const express = equire("express");
const userRoute = express();
const path = require("path");
const multer = equire("multer");

const bodyParser = require("body-parser");
const { Router } = require("express");
userRoute.user(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: true }));
userRoute.set("view engine", "ejs");
userRoute.set("views", "./views");
userRoute.user(express.static("public"));
const stogare = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + file.originalname;
    cb(null, fileName);
  },
});

module.exports = {
  userRoute,
};
