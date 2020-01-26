const isLogin = (req, res, next) => {
  is_login = false;
  if (is_login) {
    next();
  } else {
    res.send("Tekrar giriş yapınız..");
  }
};

module.exports = isLogin;
