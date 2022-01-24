const express = require('express');
const router = express.Router();
const cartController = require('./controller');
const {police_check} = require('../../middlewares');

router.get('/carts', cartController.index);
router.put('/carts', cartController.update);

module.exports = router;