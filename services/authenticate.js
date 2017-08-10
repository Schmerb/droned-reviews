'use strict';

const { BasicStrategy } = require('passport-http');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

const { User } = require('../models/user');


// Strategy for validating user password
const basicStrategy = new BasicStrategy((username, password, done) => {
    let user;
    console.log("username", username);
    console.log("password", password);
    User
        .findOne({ username: username })
        .exec()
        .then(_user => {
            user = _user;
            if (!user) {
                console.log('Username doesnt exist');
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect username or password',
                });
            }
            return user.validatePassword(password);
        })
        .then(isValid => {
            if (!isValid) {
                console.log("password incorrect");
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect username or password',
                });
            }
            console.log("Basic, Password MATCH");
            return done(null, user);
            
        })
        .catch(err => {
            if (err.reason === 'LoginError') {
                return done(null, false, err);
            }
            return done(err, false);
        });
});


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



module.exports = { passport, isLoggedIn, basicStrategy };