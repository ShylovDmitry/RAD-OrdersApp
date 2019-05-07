const expect = require('chai').expect;
const Order = require('@models/order');
const fixtures = require('@tests/fixtures/model-orders.json');

describe('Order', function() {

    beforeEach(function(done) {
        Order.deleteMany({}, done);
    });

    beforeEach(function(done) {
        Order.insertMany(Object.values(fixtures), done);
    });

    describe('#save()', function() {

        it('should save', async function() {
            const order = new Order({
                title: "test 1",
                status: Order.STATUSES.CREATED
            });

            await order.save();

            expect(order).to.be.an('object');
            expect(order.toObject()).to.include.all.keys('title', 'status');
            expect(order.status).to.equal(Order.STATUSES.CREATED);
        });

        it('should save with default status', async function() {
            const order = new Order({
                title: "test 1"
            });

            await order.save();

            expect(order.status).to.equal(Order.STATUSES.CREATED);
        });

    });

    describe('#status', function() {
        const validStatusChange = [
            [Order.STATUSES.CREATED, Order.STATUSES.CONFIRMED],
            [Order.STATUSES.CREATED, Order.STATUSES.CANCELLED],
            [Order.STATUSES.CONFIRMED, Order.STATUSES.CANCELLED],
            [Order.STATUSES.CONFIRMED, Order.STATUSES.DELIVERED],
        ];

        for (let statuses of validStatusChange) {
            it(`should change status from '${statuses[0]}' to '${statuses[1]}'`, async function() {
                const order = await Order.findOne({status: statuses[0]}).exec();
                order.status = statuses[1];
                await expect(order.save()).to.not.be.rejectedWith(Error);
            });
        }

        const invalidStatusChange = [
            [Order.STATUSES.CREATED, Order.STATUSES.DELIVERED],
            [Order.STATUSES.CONFIRMED, Order.STATUSES.CREATED],
            [Order.STATUSES.CANCELLED, Order.STATUSES.CREATED],
            [Order.STATUSES.CANCELLED, Order.STATUSES.CONFIRMED],
            [Order.STATUSES.CANCELLED, Order.STATUSES.DELIVERED],
            [Order.STATUSES.DELIVERED, Order.STATUSES.CREATED],
            [Order.STATUSES.DELIVERED, Order.STATUSES.CONFIRMED],
            [Order.STATUSES.DELIVERED, Order.STATUSES.CANCELLED],
        ];

        for (let statuses of invalidStatusChange) {
            it(`should NOT change status from '${statuses[0]}' to '${statuses[1]}'`, async function() {
                const order = await Order.findOne({status: statuses[0]}).exec();
                order.status = statuses[1];
                await expect(order.save()).to.be.rejectedWith(Error);
            });
        }

    });

});
