const mongoose = require('mongoose');
const config = require('@app/config');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const Order = require('@models/order');
const fixtures = require('@tests/fixtures/model-orders.json');

chai.use(chaiAsPromised);
chai.use(chaiHttp);

before(function(done) {
    mongoose.connect(config.database.test_url, { useNewUrlParser: true, useFindAndModify: false });
    mongoose.connection
        .once('open', () => done())
        .on('error', (error) => {
            console.warn('Error : ',error);
        });
});

beforeEach(function(done) {
    Order.deleteMany({}, done);
});

beforeEach(function(done) {
    Order.insertMany(Object.values(fixtures), done);
});

after(function() {
    mongoose.connection.close()
});
