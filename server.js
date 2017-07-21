'use strict';

const express = require('express');
const morgan = require('morgan');

const mainRouter = require('./mainRouter');
const {PORT} = require('./config');

const app = express();

// log the http layer
app.use(morgan('common'));
// root folder for static files
app.use(express.static('public'));

// router
app.use('/', mainRouter);

app.listen(PORT, () => {
    console.log('listening on port 8080');
})

module.exports = {app};