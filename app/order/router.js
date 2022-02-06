const express = require('express');
const router = express.Router();
const orderController = require("./controller");
const {police_check} = require("../../middlewares");

router.post("/orders", orderController.store);
router.get("/orders", orderController.index);

module.exports = router;
