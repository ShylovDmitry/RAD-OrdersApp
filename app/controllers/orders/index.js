const Order = require('@models/order');

exports.create = async function(req, res) {
    const order = new Order({
        title: req.body.title || "Untitled Order"
    });

    try {
        let newOrder = await order.save();
        res.send('Created');
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Order."
        });
    }
};
