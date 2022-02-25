const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');
const config = require('../config');
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: config.SENDGRID_KEY,
    },
  })
);

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');

  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    hasErrors: false,
    isAuthenticated: false,
    errorMessage: message,
    validationErrors: [],
  });
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const pin = req.body.pin;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      path: '/login',
      hasErrors: true,
      isAuthenticated: false,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
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
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          console.log('password mismatch');
          return res.status(422).render('auth/login', {
            path: '/login',
            hasErrors: true,
            isAuthenticated: false,
            errorMessage: 'Invalid password, Kindly re-enter the correct one!',
            validationErrors: errors.array(),
            userData: {
              username,
              pin,
            },
          });
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
    hasErrors: false,
    isAuthenticated: false,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const pin = req.body.pin;
  const confirmPin = req.body.confirmPin;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      path: '/signup',
      hasErrors: true,
      isAuthenticated: false,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
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
      return transporter.sendMail({
        to: email,
        from: 'Bankist Team <rubenkhaemba@gmail.com>',
        subject: 'Signup success',
        html: `<h1>Welcome to the Bankist Team</h1> 
              <p>Thanks for signup, looking forward to working with you!!</p>`,
      });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/login');
  });
};
