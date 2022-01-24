const express = require('express');
const router = express.Router();
const deliveryAddressController = require('./controller');
const {police_check} = require('../../middlewares');

router.get('/delivery-address', police_check('view', 'deliveryAddress'), deliveryAddressController.index);
router.post('/delivery-address', police_check('create', 'deliveryAddress') , deliveryAddressController.store);
router.put('/delivery-address/:id', police_check('update', 'deliveryAddress'), deliveryAddressController.update);
router.delete('/delivery-address/:id', police_check('delete', 'deliveryAddress'), deliveryAddressController.destroy);

module.exports = router;
