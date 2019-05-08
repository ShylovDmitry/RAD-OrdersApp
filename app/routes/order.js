var express = require('express');
var router = express.Router();
var orderController = require('@controllers/order');

router.post('/', orderController.create);
router.post('/:orderId/cancel', orderController.cancel);
router.get('/:orderId/status', orderController.getStatus);

module.exports = router;
