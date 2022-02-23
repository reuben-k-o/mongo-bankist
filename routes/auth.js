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
      .trim(),
    check('email', 'Enter a valid email').isEmail(),
    check('pin', 'Pin should and have 4 characters')
      .isNumeric()
      .isLength({ min: 4, max: 4 }),
    check('confirmPin', 'Pin should match')
      .isNumeric()
      .isLength({ min: 4, max: 4 }),
  ],
  authController.postSignup
);
router.post('/logout', authController.postLogout);

module.exports = router;
