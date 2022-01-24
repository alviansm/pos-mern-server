const express = require('express');
const router = express.Router();
const categoryController = require('./controller');
const {police_check} = require('../../middlewares');

router.get('/categories', categoryController.index);
router.post('/categories', police_check('create', 'Category'), categoryController.store);
router.put('/categories/:id', police_check('update', 'Category'),categoryController.update);
router.delete('/categories/:id', police_check('delete', 'Category'), categoryController.destroy);

module.exports = router;