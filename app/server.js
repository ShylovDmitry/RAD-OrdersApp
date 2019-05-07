const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const config_database = require('@config/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./routes'));
app.use('api/orders', require('./routes/orders'));

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

mongoose.connect(config_database.url, { useNewUrlParser: true });

app.listen(port, function() {
    console.log('Listening on port ' + port);
});

module.exports = app;
