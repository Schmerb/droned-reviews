'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const commentSchema = mongoose.Schema({
    postId: String,
    commentId: String,
    content: {type: String, required: true},
    author: {
        username: {type: String, required: true}
    },
    likes: {type: Number, default: 0},
    created: {type: Date, default: new Date()}
});

commentSchema.methods.apiRepr = function() {
    return {
        id: this._id,
        postId: this.postId,
        commentId: this.commentId,
        content: this.content,
        author: this.author,
        likes: this.likes,
        created: Date.parse(this.created)
    };
};


const Comment = mongoose.model('Comment', commentSchema);

module.exports = {Comment};