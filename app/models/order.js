const mongoose = require('mongoose');

const STATUSES = Object.freeze({
    CREATED: 'created',
    CONFIRMED: 'confirmed',
    CANCELLED: 'cancelled',
    DELIVERED: 'delivered'
});

const OrderSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(STATUSES),
        default: STATUSES.CREATED
    }
}, {
    timestamps: true
});

Object.assign(OrderSchema.statics, {
    STATUSES
});

module.exports = mongoose.model('Order', OrderSchema);
