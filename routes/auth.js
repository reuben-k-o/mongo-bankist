const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

router.get('/login', authController.getLogin);
router.post(
  '/login',
  [
    check('username', 'Username should have atleast 5 characters')
      .isLength({ min: 5 })
      .trim(),
    check('pin', 'Pin should have 4 characters')
      .isNumeric()
      .isLength({ min: 4, max: 4 }),
  ],
  authController.postLogin
);

router.get('/signup', authController.getSignup);
router.post(
  '/signup',
  [
    check('username', 'Minimum username length is 5 characters')
      .isLength({ min: 5 })
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then(userName => {
          if (userName) {
            return Promise.reject(
              'Username already exists, kindly pick a different one!'
            );
          }
        });
      })
      .trim(),
    check('email', 'Enter a valid email')
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userEm => {
          if (userEm) {
            return Promise.reject(
              'Email already exists, kindly pick another one!'
            );
          }
        });
      })
      .trim(),
    check('pin', 'Pin should and have 4 characters')
      .isNumeric()
      .isLength({ min: 4, max: 4 })
      .trim(),
    check('confirmPin')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.pin) {
          throw new Error('Pin mismatch!');
        }
        return true;
      }),
  ],
  authController.postSignup
);
router.post('/logout', authController.postLogout);

module.exports = router;
