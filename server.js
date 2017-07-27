'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const mainRouter = require('./mainRouter');
const {PORT} = require('./config');

const app = express();

// log the http layer
app.use(morgan('common'));
// root folder for static files
app.use(express.static('public'));

// router
app.use('/', mainRouter);

app.use('*', (req, res) => {
    res.status(404).json({message: 'Not Found'});
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

// let server;

// // connects to db, starts server
// function runServer(databaseUrl=DATABASE_URL, port=PORT) {
//     return new Promise((resolve, reject) => {
//         mongoose.connect(databaseUrl, err => {
//             if (err) {
//                 return reject(err);
//             }
//             server = app.listen(port, () => {
//                 console.log(`Your app is listening on port ${port}`);
//             })
//             .on('error', err => {
//                 mongoose.disconnect();
//                 reject(err);
//             });
//         });
//     });
// };

// // closes server, returns promise for testing purposes
// function closeServer() {
//     return mongoose.disconnect().then(() => {
//         return new Promise((resolve, reject) => {
//             console.log('Closing server');
//             server.close(err => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 resolve();
//             });
//         });
//     });
// };

// // server is ran if file called directly, not for tests
// if (require.main === module) {
//     runServer().catch(err => console.error(err));
// }

// for testing
module.exports = {app};