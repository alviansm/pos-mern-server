const express = require('express');
const router = express.Router();
const cartController = require('./controller');
const {police_check} = require('../../middlewares');

router.get('/carts', police_check('read', 'Cart'), cartController.index);
router.put('/carts', police_check('update', 'Cart') , cartController.update);

module.exports = router;
