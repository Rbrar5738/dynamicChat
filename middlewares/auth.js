const isLogin = (req, res, next) => {
  try {
    if (req.session.user) {
    } else {
      return res.redirect("/");
    }
    next();
  } catch (error) {
    console.log(error.messge);
  }
};

const isLogout = (req, res, next) => {
  try {
    if (req.session.user) {
      return res.redirect("/dashboard");
    } else {
    }
    next();
  } catch (error) {
    console.log(error.messge);
  }
};

module.exports = {
  isLogin,
  isLogout,
};
