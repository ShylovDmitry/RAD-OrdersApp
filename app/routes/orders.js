var express = require('express');
var router = express.Router();
var ordersController = require('@controllers/orders');

router.post('/', ordersController.create);

module.exports = router;
