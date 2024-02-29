const { userModel } = require("../models/userModel");
const bcrypt = require("bcrypt");

const home = async (req, res) => {
  try {
    return res.render("home");
  } catch (err) {
    console.log(err.message);
  }
};

const registerLoad = async (req, res) => {
  try {
    return res.render("register");
  } catch (err) {
    console.log(err.message);
  }
};

const register = async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
      image: "/uploads/" + req.file.filename,
    });
    return res.render("register", { message: "Registration succesfully!" });
  } catch (err) {
    console.log(err.message);
  }
};

const login = async (req, res) => {
  try {
    return res.render("login");
  } catch (err) {
    console.log(err.message);
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await userModel.findOne({ email: email });
    if (userData) {
      const comparedPassword = await bcrypt.compare(
        password,
        userData.password
      );
      if (comparedPassword) {
        req.session.user = userData;
        return res.render("dashboard", { user: req.session.user });
      } else {
        return res.render("login", { errorLoginMessage: "Incoorect Password" });
      }
    } else {
      return res.render("login", { errorLoginMessage: "Incoorect UserName" });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const dashboard = async (req, res) => {
  try {
    return res.render("dashboard");
  } catch (err) {
    console.log(err.message);
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy();

    return res.rediredct("/");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  registerLoad,
  register,
  home,
  login,
  handleLogin,
  logout,
  dashboard,
};
