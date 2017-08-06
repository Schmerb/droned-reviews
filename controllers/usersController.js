'use strict';


const { passport } = require('../services/authenticate');
const { User } = require('../models/user');


// creates user 
exports.createUser = (req, res) => {

    if (!req.body) {
        return res.status(400).json({ message: 'No request body' });
    }

    let { username, password, email } = req.body;

    // Email
    if (!email) {
        return res.status(422).json({ message: 'Missing field: email' });
    }

    if (typeof email !== 'string') {
        return res.status(422).json({ message: 'Incorrect field type: email' });
    }

    email = email.trim();

    if (email === '') {
        return res.status(422).json({ message: 'Incorrect field length: email' });
    }

    // Username
    if (!username) {
        return res.status(422).json({ message: 'Missing field: username' });
    }

    if (typeof username !== 'string') {
        return res.status(422).json({ message: 'Incorrect field type: username' });
    }

    username = username.trim();

    if (username === '') {
        return res.status(422).json({ message: 'Incorrect field length: username' });
    }

    // Password
    if (!(password)) {
        return res.status(422).json({ message: 'Missing field: password' });
    }

    if (typeof password !== 'string') {
        return res.status(422).json({ message: 'Incorrect field type: password' });
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({ message: 'Incorrect field length: password' });
    }

    // check for existing user --> CHECK FOR EMAIL FIRST (Multiple account check) and then for username availability 
    return User
        .find({email})
        .count()
        .exec()
        .then(count => {
            if(count > 0) {
                return res.status(422).json({message: 'An account is already registered with this email'});
            }
        })
        .then(() => {
            return User
                .find({username})
                .count()
                .exec();
        })
        .then(count => {
            if (count > 0) {
                return res.status(422).json({message: 'username already taken'});
            }
            // if no existing user, hash password
            console.log('first then');
            return User.hashPassword(password);
        })
        .then(hash => {
            console.log('second then');
            return User
                .create({
                    username: username,
                    password: hash,
                    email: email
                })
        })
        .then(user => {
            return res.status(201).json(user.apiRepr());
        })
        .catch(err => {
            res.status(500).json({message: 'Internal server error'})
        });    
};

// displays all users in db -- Debugging ONLY
exports.getAllUsers = (req, res) => {
    return User
        .find()
        .exec()
        .then(users => res.json(users.map(user => user.apiRepr())))
        .catch(err => {
            res.status(500).json({message: 'Internal server error'})
        }); 
};

// returns user credentials if logged in
exports.getUser = (req, res) => {
    res.json({user: req.user.apiRepr()});
};

// logs user in to session
// exports.logUserIn = (req, res) => {
//     console.log("BEFORE SERIAL");
//     req.login;
//     passport.serializeUser(req.user);
//     console.log('User logged in to session');
//     res.redirect('/');
// };





