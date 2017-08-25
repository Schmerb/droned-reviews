'use strict';

const {checkSessionCookieLoggedIn} = require('../services/cookieCheck');

exports.getLanding = (req, res) => {
    let {loggedIn, username} = checkSessionCookieLoggedIn(req);

    res.status(200).render('pages/landing', {
        loggedIn: loggedIn,
        username: JSON.stringify(username)
    });
};


exports.getIndex = (req, res) => {
    let {loggedIn, username} = checkSessionCookieLoggedIn(req);

    console.log({loggedIn, username});

    res.status(200).render('index', {
        loggedIn: loggedIn,
        username: JSON.stringify(username)
    });
};


exports.getMission = (req, res) => {
    let {loggedIn, username} = checkSessionCookieLoggedIn(req);
    res.status(200).render('pages/mission', {
        loggedIn: loggedIn,
        username: JSON.stringify(username)
    });
}

