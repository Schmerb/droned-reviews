'use strict';

// // // // // // // // // // // // // // // // // //
//
// Middelware
// Checks if 'visited' session cookie exists
//
// // // // // // // // // // // // // // // // // //
const checkSessionCookieVisited = (req, res, next) => {
    let visited  = req.cookies.visited;
    if(!visited || visited !== 'true') {
        res.cookie('visited', 'true');
        res.redirect('/welcome');
    }
    next();
}


// // // // // // // // // // // // // // // // // //
//  
// To check if 'loggedIn' session cookie exists
//
// // // // // // // // // // // // // // // // // //
const checkSessionCookieLoggedIn = req => {
    let username = req.cookies.loggedIn;
    console.log('username: ', username);
    console.log('cookies LOGGED IN', req.cookies);
    let loggedIn = false;
    if (username !== undefined && username !== '') {
        loggedIn = true;
    }
    return { loggedIn, username };
}


module.exports = { checkSessionCookieVisited, checkSessionCookieLoggedIn };