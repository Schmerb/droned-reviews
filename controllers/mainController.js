'use strict';


exports.getIndex = (req, res) => {
    let loggedIn = false;
    
    if (req.isAuthenticated()) {
        console.log("Yes, user logged in");
        loggedIn = true;
    } else {
        console.log("NO, user not logged in");
    }

    res.status(200).render('index', {
        loggedIn: loggedIn
    });
};
