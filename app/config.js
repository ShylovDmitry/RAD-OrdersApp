module.exports = {
    payment_service: {
        url: 'http://localhost:3001',
        secret: 'rad_secret_key',
    },
    database: {
        url: 'mongodb://localhost/rad_ordersapp',
        test_url: 'mongodb://localhost/rad_ordersapp_test'
    }
};
