const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('@app/config');

const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes'));
app.use('/api/order', require('./routes/order'));

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

mongoose.connect(config.database.url, { useNewUrlParser: true });

app.listen(port, function() {
    console.log('Listening on port ' + port);
});

module.exports = app;
