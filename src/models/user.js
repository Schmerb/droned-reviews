'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// API response format
UserSchema.methods.apiRepr = function() {
    return {
        id: this._id,
        username: this.username,
        password: this.password,
        email: this.email
    };
}

// Checks if password given matches account password
UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
}

// Returns encrypted password
UserSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
}


const User = mongoose.model('User', UserSchema);


module.exports = {User};