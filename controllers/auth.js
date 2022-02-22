const User = require('../models/user');

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

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const pin = req.body.pin;

  const user = new User({
    username,
    email,
    pin,
  });
  user.save().then(() => {
    res.redirect('/login');
  });
};
