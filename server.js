'use strict';

const express       = require('express');
const session       = require('express-session');
const morgan        = require('morgan');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const path          = require('path');
// const swigTemplates = require('swig-templates');
const flash         = require('connect-flash');
const engine        = require('ejs-mate');

const router               = require('./routes');
const {DATABASE_URL, PORT} = require('./config/database');

// Use ES6 promises
mongoose.Promise = global.Promise;

// create express app instance
const app = express();


// CONFIGURE APP
// const swig = new swigTemplates.Swig();
// app.engine('swig', swig.renderFile);
// app.set('view engine', 'swig');
app.engine('ejs', engine);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


// MIDDLEWARE
app.use(morgan('common')); // log the http layer
app.use(express.static(path.join(__dirname, 'public'))); // root folder for static files
app.use(cookieParser());
app.use(bodyParser.json()); // parses request and exposes it on req.body
app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(session({ secret: 'secret' }));
app.use(flash());

// ROUTES
app.use(router);


// fallback error message for all non-existant endpoints
app.use('*', (req, res) => {
    res.status(404).json({message: 'Not Found'});
});


// SERVER / DB CONNECTION

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