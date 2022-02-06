const express = require('express');
const router = express.Router();
const deliveryAddressController = require('./controller');
const {police_check} = require('../../middlewares');

router.get('/delivery-address', deliveryAddressController.index);
router.post('/delivery-address', deliveryAddressController.store);
router.put('/delivery-address/:id', deliveryAddressController.update);
router.delete('/delivery-address/:id', deliveryAddressController.destroy);

module.exports = router;
