'use strict';


exports.getIndex = (req, res) => {
    let {loggedIn, username} = checkSessionCookie(req);

    res.status(200).render('index', {
        loggedIn: loggedIn,
        username: JSON.stringify(username)
    });
};


exports.getMission = (req, res) => {
    let {loggedIn, username} = checkSessionCookie(req);
    res.status(200).render('pages/mission', {
        loggedIn: loggedIn,
        username: JSON.stringify(username)
    });
}


// To check if session cookie exists
const checkSessionCookie = req => {
    let loggedIn = false;
    let username = req.cookies.loggedIn;

    console.log(req.cookies);

    if (username !== '') {
        loggedIn = true;
    }

    return {loggedIn, username};
}
