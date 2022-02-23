const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  if (errorMessage > 0) {
  }
  res.render('auth/login', {
    path: '/login',
    isAuthenticated: false,
    hasErrors: false,
    errorMessage: null,
    userData: [],
  });
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const pin = req.body.pin;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      path: '/login',
      isAuthenticated: false,
      hasErrors: true,
      errorMessage: errors.array()[0].msg,
      userData: {
        username,
        pin,
      },
    });
  }

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
    hasErrors: false,
    errorMessage: null,
    userData: [],
  });
};

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const pin = req.body.pin;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      path: '/signup',
      isAuthenticated: false,
      hasErrors: true,
      errorMessage: errors.array()[0].msg,
      userData: {
        username,
        email,
        pin,
        confirmPin,
      },
    });
  }

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
