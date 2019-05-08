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
        default: STATUSES.CREATED,
        set: function(status) {
            this._status = this.status;
            return status;
        }
    },
    amount: {
        type: Number,
        required: true,
        set: function(amount) {
            return amount * 100;
        },
        get: function(amount) {
            return parseFloat((amount / 100).toFixed(2));
        },
    }
}, {
    timestamps: true
});

OrderSchema.pre('save', function (next) {
    var oldStatus = this._status;
    if (this.isModified('status')) {
        const allowedStatuses = {
            [STATUSES.CREATED] : [STATUSES.CREATED],
            [STATUSES.CONFIRMED] : [STATUSES.CREATED],
            [STATUSES.CANCELLED] : [STATUSES.CREATED, STATUSES.CONFIRMED],
            [STATUSES.DELIVERED] : [STATUSES.CONFIRMED],
        };

        const allowedPreviousStatuses = allowedStatuses[this.status];
        if (allowedPreviousStatuses.indexOf(oldStatus) === -1) {
            return next(new Error(`Not allowed flow for status (${oldStatus} => ${this.status})`));
        } else {
            next();
        }
    }
    next();
});

Object.assign(OrderSchema.statics, {
    STATUSES
});

module.exports = mongoose.model('Order', OrderSchema);
