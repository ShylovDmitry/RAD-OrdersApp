const express = require('express');
const router = express.Router();
const orderController = require('@controllers/order');

router.post('/', orderController.create);
router.post('/:orderId/cancel', orderController.cancel);
router.get('/:orderId/status', orderController.getStatus);

module.exports = router;
