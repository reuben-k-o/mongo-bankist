const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const authController = require('../controllers/auth');

router.get('/login', authController.getLogin);
router.post(
  '/login',
  [
    check('username', 'Username should have atleast 5 characters')
      .isLength({ min: 5 })
      .trim(),
    check('pin', 'Pin should have 4 characters')
      .isNumeric()
      .isLength({ min: 4 })
      .trim(),
  ],
  authController.postLogin
);

router.get('/signup', authController.getSignup);
router.post(
  '/signup',
  [
    check('username', 'Minimum username length is 5 characters')
      .isLength({ min: 5 })
      .trim(),
    check('email', 'Enter a valid email').isURL(),
    check('pin', 'Pin should and have 4 characters')
      .isNumeric()
      .isLength({ min: 4, max: 4 })
      .trim(),
    check('confirmPin', 'Pin should match').isNumeric().trim(),
  ],
  authController.postSignup
);

module.exports = router;
