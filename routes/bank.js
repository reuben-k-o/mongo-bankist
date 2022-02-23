const express = require('express');
const router = express.Router();

const bankController = require('../controllers/bank');

router.get('/', bankController.getIndex);

router.get('/', bankController.getMovements);
router.post('/', bankController.postMovements);

module.exports = router;
