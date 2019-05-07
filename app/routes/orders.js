var express = require('express');
var router = express.Router();
var ordersController = require('@controllers/orders');

router.post('/orders', ordersController.create);

module.exports = router;
