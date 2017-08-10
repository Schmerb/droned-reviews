'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const postSchema = mongoose.Schema({
    title: {type: String, requiure: true},
    drone: {
        make: {type: String, requiure: true},
        model: {type: String, requiure: true}
    },
    content: {type: String, required: true},
    author: {
        username: {type: String, required: true}
    },
    rating: {type: Number, required: true},
    votes: {type: Number, default: 0},
    usersVoted: [
        {type: String, default: ''}
    ],
    files: {
        imgId: String
    },
    created: {type: Date, default: Date.now()}
});

// virtuals
postSchema.virtual('droneName').get(function() {
  return `${this.drone.make} ${this.drone.model}`.trim();
});

// used to handle what data gets returned to user in api response
postSchema.methods.apiRepr = function() {
    return {
        id: this._id,
        title: this.title,
        drone: this.drone,
        author: this.author,
        content: this.content,
        rating: this.rating,
        votes: this.votes,
        usersVoted: this.usersVoted,
        created: this.created
    };
}

// create model object
const Post = mongoose.model('Post', postSchema);


module.exports = {Post};