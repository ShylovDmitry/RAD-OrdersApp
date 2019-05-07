var expect = require('chai').expect;
const Order = require('@models/order');

describe('Order', function() {

    describe('#save()', function() {

        it('should save', function(done) {
            const order = new Order({
                title: "test 1",
                status: Order.STATUSES.CREATED
            });

            order.save(function(err, order) {
                if (err) done(err);

                expect(order).to.be.an('object');
                expect(order.toObject()).to.include.all.keys('title', 'status');
                expect(order.status).to.equal(Order.STATUSES.CREATED);
                done();
            });
        });

        it('should save with default status', function(done) {
            const order = new Order({
                title: "test 1"
            });

            order.save(function(err, order) {
                if (err) done(err);

                expect(order.status).to.equal(Order.STATUSES.CREATED);
                done();
            });
        });

    });

});
