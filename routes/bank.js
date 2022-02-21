const express = require('express');
const router = express.Router();

const bankController = require('../controllers/bank');

router.get('/', bankController.getIndex);

router.get('/login', bankController.getLogin);

router.post('/login', bankController.postLogin);

module.exports = router;
