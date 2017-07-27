'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const mainRouter = require('./mainRouter');
const {DATABASE_URL, PORT} = require('./config');

const getFeed = require('./services/rssFeeds');



const app = express();

// log the http layer
app.use(morgan('common'));
// root folder for static files
app.use(express.static('public'));

app.use(getFeed);

// router
app.use('/', mainRouter);

app.use('*', (req, res) => {
    res.status(404).json({message: 'Not Found'});
});

////

// const FeedParser = require('feedparser');
//   const request = require('request'); // for fetching the feed

//   let req = request('http://dronelife.com/feed/');
//   const feedparser = new FeedParser();
//   req.on('error', function (error) {
//     // handle any request errors
//   });

//   req.on('response', function (res) {
//     let stream = this; // `this` is `req`, which is a stream

//     if (res.statusCode !== 200) {
//       this.emit('error', new Error('Bad status code'));
//     }
//     else {
//       stream.pipe(feedparser);
//     }
//   });

//   feedparser.on('error', function (error) {
//     // always handle errors
//   });

//   feedparser.on('readable', function () {
//     // This is where the action is!
//     let stream = this; // `this` is `feedparser`, which is a stream
//     let meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
//     let item;

//     while (item = stream.read()) {
//       console.log(item);
//     }
//   });

////

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
            })
            .on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
};

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
};

// server is ran if file called directly, not for tests
if (require.main === module) {
    runServer().catch(err => console.error(err));
}

// for testing
module.exports = {app, runServer, closeServer};