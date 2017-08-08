'use strict';


const { passport } = require('../services/authenticate');
const { User } = require('../models/user');


// creates user 
exports.createUser = (req, res) => {

    if (!req.body) {
        return res.status(400).json({ message: 'No request body' });
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
            
            return res.status(201).json({username, password});
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
        .then(users => res.json({
            users: users.map(user => user.apiRepr()),
            loggedIn: req.user
        }))
        .catch(err => {
            res.status(500).json({message: 'Internal server error'})
        }); 
};

// returns user credentials if logged in
exports.getUser = (req, res) => {
    res.json({user: req.user.apiRepr()});
};




