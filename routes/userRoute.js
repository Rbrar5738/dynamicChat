const express = require("express");
const userRoute = express();
const path = require("path");
const session = require("express-session");
const auth = require("../middlewares/auth");
const { SESSION_SECRET } = process.env;
userRoute.use(session({ secret: SESSION_SECRET }));
const multer = require("multer");
const userController = require("../controllers/userController");

const storagLocation = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}_${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storagLocation });
userRoute.get("/", userController.home);
userRoute.get("/register", userController.registerLoad);
userRoute.post("/register", upload.single("image"), userController.register);

userRoute.get("/login", auth.isLogout, userController.login);
userRoute.post("/userlogin", userController.handleLogin);
userRoute.get("/logout", auth.isLogin, userController.logout);

userRoute.get("*", (req, res) => {
  return res.redirect("/");
});

module.exports = {
  userRoute,
};
