'use strict';


exports.getIndex = (req, res) => {
    // if (req.cookies.loggedIn !== '') {
    //     console.log('COOKIE WORKED', req.cookies.loggedIn);
    // }
    // console.log("cookies", req.cookies);

    let loggedIn = false;
    let username = req.cookies.loggedIn;
    
    if (username !== '') {
        loggedIn = true;
    }

    res.status(200).render('index', {
        loggedIn: loggedIn,
        username: username
    });
};
