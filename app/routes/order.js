var express = require('express');
var router = express.Router();
var orderController = require('@controllers/order');

router.post('/', orderController.create);
router.post('/:oderId/cancel', orderController.doCancel);
router.get('/:oderId/status', orderController.getStatus);

module.exports = router;
