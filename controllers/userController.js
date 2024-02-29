const registerLoad = async (req, res) => {
  try {
    return res.render("register");
  } catch (err) {
    console.log(err.message);
  }
};

const register = async (req, res) => {
  try {
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  registerLoad,
  register,
};
