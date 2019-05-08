const Order = require('@models/order');
const superagent = require('superagent');
const jwt = require('jsonwebtoken');
const config = require('@app/config');

exports.create = async function({title, amount}) {
    const order = new Order({
        title,
        amount
    });

    return await order.save();
};

exports.cancel = async function(order) {
    order.status = Order.STATUSES.CANCELLED;

    return await order.save();
};

exports.deliver = async function(order) {
    order.status = Order.STATUSES.DELIVERED;

    return await order.save();
};

exports.makePayment = async function(order) {
    const paymentResponse = await sendPayment(order);
    await updateOrderStatusByPaymentResponse(order, paymentResponse.data.status);
};

async function sendPayment(order) {
    const {_id: id, title, amount} = order;
    const params =  {id, title, amount};

    const token = jwt.sign(params, config.payment_service.secret);
    return await superagent.post(config.payment_service.url + '/api/payment/process').send({token});
}

async function updateOrderStatusByPaymentResponse(order, paymentStatus) {
    order.status = (paymentStatus === 'confirmed')
        ? Order.STATUSES.CONFIRMED
        : Order.STATUSES.CANCELLED;

    return await order.save();
}
