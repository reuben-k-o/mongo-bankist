const express = require('express');
const router = express.Router();

const bankController = require('../controllers/bank');
const isAuth = require('../middleware/is-auth');

router.get('/', isAuth, bankController.getIndex);

router.get('/', isAuth, bankController.getMovements);
router.post('/', isAuth, bankController.postMovements);

module.exports = router;
