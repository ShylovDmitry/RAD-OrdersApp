const Order = require('@models/order');

exports.create = async function(req, res) {
    try {
        const order = new Order({
            title: req.body.title
        });

        let newOrder = await order.save();
        res.send(newOrder);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Order."
        });
    }
};

exports.doCancel = async function(req, res) {

};

exports.getStatus = async function(req, res) {

};
