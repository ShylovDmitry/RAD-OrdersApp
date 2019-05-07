const mongoose = require('mongoose');
const config_database = require('@config/database');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

before(function(done) {
    mongoose.connect(config_database.test_url, { useNewUrlParser: true, useFindAndModify: false });
    mongoose.connection
        .once('open', () => done())
        .on('error', (error) => {
            console.warn('Error : ',error);
        });
});

after(function() {
    mongoose.connection.close()
});
