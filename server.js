'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./routes');
const {DATABASE_URL, PORT} = require('./config');

// Use ES6 promises
mongoose.Promise = global.Promise;


const app = express();

// middelware

// log the http layer
app.use(morgan('common'));
// root folder for static files
app.use(express.static('public'));
// parses request and exposes it on req.body
app.use(bodyParser.json());


// routes
app.use(router);

// fallback error message for all non-existant endpoints
app.use('*', (req, res) => {
    res.status(404).json({message: 'Not Found'});
});

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// connects to db, starts server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// closes server, returns promise for testing purposes
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

// server is ran if file called directly, not for tests
if (require.main === module) {
    runServer().catch(err => console.error(err));
}

// for testing
module.exports = {app, runServer, closeServer};