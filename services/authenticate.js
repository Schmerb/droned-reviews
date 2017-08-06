'use strict';

const { BasicStrategy } = require('passport-http');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

const { User } = require('../models/user');


// Strategy for validating user password
const basicStrategy = new BasicStrategy((username, password, done) => {
    let user;
    console.log("INSIDE BSTRAT");
    User
        .findOne({ username: username })
        .exec()
        .then(_user => {
            user = _user;
            if (!user) {
                return done(null, false);
            }
            return user.validatePassword(password);
        })
        .then(isValid => {
            console.log("BSTRAT, VALID PASS");
            if (!isValid) {
                return done(null, false);
            }
            else {
                return done(null, user);
            }
        })
        .catch(err => done(err));

        
});

// Strategy for local login, validating user password
const localStrategy = new LocalStrategy((username, password, done) => {
    User
        .findOne({ username: username }, (err, user) => {
            if (err)  { 
                return done(err); 
            }
            if (!user) {
                console.log('localStrategy invalid username');
                return done(null, false);
            }
            if (!user.validatePassword(password)) {
                console.log('localStrategy password INVALID');
                return done(null, false);
            }
            return done(null, user);
        });
});


// tells passport what strategy to use for
// user authentication (password validation)
passport.use(basicStrategy);
// tells passport to use local strategy
// to handle login / logout requests
passport.use(localStrategy);



// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.json({
        message: "You are not signed in"
    });
}



module.exports = { passport, isLoggedIn };