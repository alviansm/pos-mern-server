const express = require('express');
const router = express.Router();
const invoiceController= require('./controller');

router.get('/invoices/:order_id', invoiceController.show);

module.exports = router;