'use strict';

const express       = require('express'),
      bodyParser    = require('body-parser');

const {checkSessionCookieLoggedIn} = require('../services/cookieCheck');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

// DJI
router.get('/dji', (req, res) => {
    let {loggedIn, username} = checkSessionCookieLoggedIn(req);

    res.render('pages/drones/dji', {
        loggedIn: loggedIn,
        username: JSON.stringify(username)
    });
});

// GoPro
router.get('/gopro', (req, res) => {
    let {loggedIn, username} = checkSessionCookieLoggedIn(req);

    res.render('pages/drones/gopro', {
        loggedIn: loggedIn,
        username: JSON.stringify(username)
    });
});

// Parrot
router.get('/parrot', (req, res) => {
    let {loggedIn, username} = checkSessionCookieLoggedIn(req);

    res.render('pages/drones/parrot', {
        loggedIn: loggedIn,
        username: JSON.stringify(username)
    });
});

// Yuneec
router.get('/yuneec', (req, res) => {
    let {loggedIn, username} = checkSessionCookieLoggedIn(req);

    res.render('pages/drones/yuneec', {
        loggedIn: loggedIn,
        username: JSON.stringify(username)
    });
});

// Syma
router.get('/syma', (req, res) => {
    let {loggedIn, username} = checkSessionCookieLoggedIn(req);

    res.render('pages/drones/syma', {
        loggedIn: loggedIn,
        username: JSON.stringify(username)
    });
});

// Hubsan
router.get('/hubsan', (req, res) => {
    let {loggedIn, username} = checkSessionCookieLoggedIn(req);

    res.render('pages/drones/hubsan', {
        loggedIn: loggedIn,
        username: JSON.stringify(username)
    });
});

// Xiro
router.get('/xiro', (req, res) => {
    let {loggedIn, username} = checkSessionCookieLoggedIn(req);

    res.render('pages/drones/xiro', {
        loggedIn: loggedIn,
        username: JSON.stringify(username)
    });
});

// UDI
router.get('/udi', (req, res) => {
    let {loggedIn, username} = checkSessionCookieLoggedIn(req);

    res.render('pages/drones/udi', {
        loggedIn: loggedIn,
        username: JSON.stringify(username)
    });
});



module.exports = router;