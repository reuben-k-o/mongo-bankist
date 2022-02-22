exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    isAuthenticated: false,
  });
};

exports.postSignup = (req, res, next) => {};
