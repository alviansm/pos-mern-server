const express = require('express');
const router = express.Router();
const orderController = require("./controller");
const {police_check} = require("../../middlewares");

router.post("/orders", police_check('create', 'Order'), orderController.store);
router.get("/orders", police_check('read', 'Order'), orderController.index);

module.exports = router;
