'use strict';

const express = require('express');
const morgan = require('morgan');

const mainRouter = require('./mainRouter');

const app = express();

// log the http layer
app.use(morgan('common'));

// root folder for static files
app.use(express.static('public'));

app.use('/', mainRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log('listening on port 8080');
})