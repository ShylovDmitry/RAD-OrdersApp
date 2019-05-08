const expect = require('chai').expect;
const chai = require('chai');
const server = require('@app/server');
const Order = require('@models/order');
const superagent = require('superagent');
const sinon = require('sinon');

describe('Order API', function() {
    let postRequest;

    before(function() {
        postRequest = sinon.stub(superagent, 'post');
    });

    after(function() {
        postRequest.restore();
    });

    describe('POST /api/order', function() {

        it('should create an order', async function() {
            postRequest.returns({body: {status: 'confirmed'}});

            const ORDER_TITLE = 'aaaaaaaaa';

            const data = {
                title: ORDER_TITLE,
                amount: 12.43
            };

            const res = await chai.request(server)
                .post('/api/order')
                .send(data);

            expect(res).to.have.status(200);


            const order = await Order.findOne({title: ORDER_TITLE}).exec();

            expect(order).to.be.an('object');
            expect(order.toObject()).to.include.all.keys('title', 'status');
        });

    });

    describe('POST /api/order/:orderId/cancel', function() {

        it('should cancel an order', async function() {
            const init_order = await Order.findOne({status: Order.STATUSES.CREATED}).exec();

            const res = await chai.request(server)
                .post(`/api/order/${init_order._id}/cancel`);

            expect(res).to.have.status(200);


            const order = await Order.findById(init_order._id).exec();

            expect(order).to.be.an('object');
            expect(order.status).equal(Order.STATUSES.CANCELLED);
        });

    });

    describe('GET /api/order/:orderId/status', function() {

        it('should retrieve status of an order', async function() {
            const order1 = await Order.findOne({status: Order.STATUSES.DELIVERED}).exec();

            const res = await chai.request(server)
                .get(`/api/order/${order1._id}/status`);

            expect(res).to.have.status(200);
            expect(res.body.status).equal(Order.STATUSES.DELIVERED);
        });

    });

});
