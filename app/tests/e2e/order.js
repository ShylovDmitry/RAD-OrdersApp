const expect = require('chai').expect;
const chai = require('chai');
const server = require('@app/server');
const Order = require('@models/order');
const fixtures = require('@tests/fixtures/model-orders.json');

describe('Order API', function() {

    describe('POST /api/order', function() {

        it('should create an order', async function() {
            const ORDER_TITLE = 'aaaaaaaaa';
            const data = {
                title: ORDER_TITLE
            };

            const res = await chai.request(server)
                .post('/api/order')
                .send(data);

            expect(res).to.have.status(200);


            const order = await Order.findOne({title: ORDER_TITLE}).exec();

            expect(order).to.be.an('object');
            expect(order.toObject()).to.include.all.keys('title', 'status');
            expect(order.status).equal(Order.STATUSES.CREATED);
        });

    });

});
