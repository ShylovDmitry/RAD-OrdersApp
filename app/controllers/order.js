const Order = require('@models/order');
const OrderService = require('@services/order');

exports.create = async function(req, res) {
    try {
        const {title, amount} = req.body;
        const order = await OrderService.create({
            title,
            amount
        });

        res.send(order);

        setTimeout(async () => {
            await OrderService.makePayment(order);
        }, 0);

        setTimeout(async () => {
            await OrderService.deliver(order);
        },  5000);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Order."
        });
    }
};

exports.cancel = async function(req, res) {
    try {
        let anOrder = await Order.findById(req.params.orderId);
        const order = OrderService.cancel(anOrder);

        res.send(order);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Order."
        });
    }
};

exports.getStatus = async function(req, res) {
    try {
        let order = await Order.findById(req.params.orderId);
        res.json({status: order.status});
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Order."
        });
    }
};
