// To check if 'visited' session cookie exists
const checkSessionCookieVisited = (req, res, next) => {
    let visited  = req.cookies.visited;

    console.log(req.cookies);


    if(!visited || visited !== 'true') {
        res.cookie('visited', 'true');
        res.redirect('/welcome');
    }

    next();
}

// To check if 'loggedIn' session cookie exists
const checkSessionCookieLoggedIn = req => {
    let loggedIn = false;

    let username = req.cookies.loggedIn;

    console.log(req.cookies);

    if (username !== '') {
        loggedIn = true;
    }


    return {loggedIn, username};
}


module.exports = {checkSessionCookieVisited, checkSessionCookieLoggedIn};