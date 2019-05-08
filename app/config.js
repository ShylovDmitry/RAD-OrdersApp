module.exports = {
    payment_service: {
        url: 'http://paymentsapp:3001',
        secret: 'rad_secret_key',
    },
    database: {
        url: 'mongodb://mongo:27017/rad_ordersapp',
        test_url: 'mongodb://mongo:27017/rad_ordersapp_test'
    }
};
