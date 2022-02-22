const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const pin = req.body.pin;
  //   const userId = req.body.user._id;

  User.findOne({ username: username })
    .then(user => {
      if (!user) {
        return res.redirect('/login');
      }
      return bcrypt
        .compare(pin, user.pin)
        .then(doMatch => {
          if (doMatch) {
            console.log('logged in');
            return res.redirect('/');
          }
          console.log('password mismatch');
          return res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => console.log(err));
};

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

  bcrypt
    .hash(pin, 12)
    .then(hashedPin => {
      const user = new User({
        username,
        email,
        pin: hashedPin,
      });
      return user.save();
    })
    .then(() => {
      res.redirect('/login');
    })
    .catch(err => console.log(err));
};
