const mongoose = require('mongoose');
const config_database = require('@config/database');

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect(config_database.test_url, { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => done())
        .on('error', (error) => {
            console.warn('Error : ',error);
        });
});

beforeEach((done) => {
    mongoose.connection.collections.orders.drop(() => {
        done();
    });
});

after(() => {
    mongoose.connection.close()
});
