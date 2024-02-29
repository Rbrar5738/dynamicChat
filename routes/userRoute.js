const express = require("express");
const userRoute = express();
const path = require("path");
const multer = require("multer");
const userController = require("../controllers/userController");

const bodyParser = require("body-parser");

userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: true }));
userRoute.set("view engine", "ejs");
userRoute.set("views", "./views");
userRoute.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ strorage: storage });

userRoute.get("/register", userController.registerLoad);
userRoute.post("/register", upload.single("image"), userController.register);

module.exports = {
  userRoute,
};
