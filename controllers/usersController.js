'use strict';


const { passport } = require('../services/authenticate');
const { User } = require('../models/user');


// creates user 
exports.createUser = (req, res) => {

    if (!req.body) {
        return res.status(400).json({
            code: 422,
            reason: 'ValidationError',
            message: 'No request body'
        });
    }

    const requiredFields = ['email', 'username', 'password'];
    const missingField = requiredFields.find(field => !(field in req.body));

    if (missingField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Missing field',
            location: missingField
        });
    }

    const stringFields = ['email', 'username', 'password'];
    const nonStringField = stringFields.find(field =>
        (field in req.body) && typeof req.body[field] !== 'string'
    );

    if (nonStringField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Incorrect field type: expected string',
            location: nonStringField
        });
    }

    // If the username and password aren't trimmed we give an error.  Users might
    // expect that these will work without trimming (i.e. they want the password
    // "foobar ", including the space at the end).  We need to reject such values
    // explicitly so the users know what's happening, rather than silently
    // trimming them and expecting the user to understand.
    // We'll silently trim the other fields, because they aren't credentials used
    // to log in, so it's less of a problem.
    const explicityTrimmedFields = ['username', 'password'];
    const nonTrimmedField = explicityTrimmedFields.find(field =>
        req.body[field].trim() !== req.body[field]
    );

    if (nonTrimmedField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Cannot start or end with whitespace',
            location: nonTrimmedField
        });
    }

    const sizedFields = {
        username: {
            min: 1
        },
        password: {
            min: 8,
            // bcrypt truncates after 72 characters, so let's not give the illusion
            // of security by storing extra (unused) info
            max: 72
        }
    };
    const tooSmallField = Object.keys(sizedFields).find(field =>
        'min' in sizedFields[field] &&
        req.body[field].trim().length < sizedFields[field].min
    );
    const tooLargeField = Object.keys(sizedFields).find(field =>
        'max' in sizedFields[field] &&
        req.body[field].trim().length > sizedFields[field].max
    );

    if (tooSmallField || tooLargeField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: tooSmallField ?
                `Must be at least ${sizedFields[tooSmallField].min} characters long` :
                `Must be at most ${sizedFields[tooLargeField].max} characters long`,
            location: tooSmallField || tooLargeField
        });
    }

    let { email, username, password } = req.body;
    // Username and password come in pre-trimmed, otherwise we throw an error
    // before this
    email = email.trim();

    // check for existing user --> CHECK FOR EMAIL FIRST (Multiple account check) and then for username availability 
    return User
        .find({ email })
        .count()
        .exec()
        .then(count => {
            if (count > 0) {
                return Promise.reject({
                    code: 422,
                    reason: 'ValidationError',
                    message: 'An account is already registered with this email',
                    location: 'email'
                });
            }
        })
        .then(() => {
            return User
                .find({ username })
                .count()
                .exec();
        })
        .then(count => {
            if (count > 0) {
                return Promise.reject({
                    code: 422,
                    reason: 'ValidationError',
                    message: 'Username already taken',
                    location: 'username'
                });
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
            // Successfully created user
            // log them in
            // res.cookie('loggedIn', user.username);
            return res.status(201).json(user.apiRepr());
        })
        .catch(err => {
            if (err.reason === 'ValidationError') {
                return res.status(err.code).json(err);
            }
            res.status(500).json({code: 500, message: 'Internal server error'});
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
            res.status(500).json({ message: 'Internal server error' })
        });
};

// returns user credentials if logged in
exports.getUser = (req, res) => {
    res.json({ user: req.user.apiRepr() });
};




