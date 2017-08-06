'use strict';

const mongoose = require('mongoose');
const {Comment} = require('../models/comments');

mongoose.Promise = global.Promise;

// * * * * * * * * * * * * * * * 
// CREATE Comment
// * * * * * * * * * * * * * * * 
exports.createComment = (req, res) => {
    const requiredProps = ['content', 'author'];
    const nestedProps = ['username'];
    // Check for required fields in request body
    for (let field of requiredProps) {
        if (!(field in req.body)) {
            return res.status(400).send(`Missing ${field} in request body.`);
        }
    }
    for (let field of nestedProps) {
        if (!(field in req.body.author)) {
            return res.status(400).send(`Missing ${field} in request body.`);
        }
    }
    // Create new Comment object from request body fields
    const newComment = {
        postId: req.body.postId,
        commentId: req.body.commentId,
        content: req.body.content,
        author: req.body.author
    };


    // Store comment in db
    Comment
        .create(newComment)
        .then(comment => {
            res.status(201).json(comment.apiRepr())
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal server error');
        });
};

// * * * * * * * * * * * * * * * 
// GET all Comments
// * * * * * * * * * * * * * * * 
exports.getComments = (req, res) => {
    Comment
        .find()
        .exec()
        .then(comments => {
            res.json({
                comments: comments.map(comment => comment.apiRepr())
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal server error');
        });
};

// * * * * * * * * * * * * * * * 
// GET Comment by ID
// * * * * * * * * * * * * * * * 
exports.getCommentById = (req, res) => {
    // console.log(req.params.id);
    Comment
        .findById(req.params.id)
        .exec()
        .then(comment => {
            res.json(comment.apiRepr());
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal server error');
        });
}

// * * * * * * * * * * * * * * * 
// GET all Comments by post ID
// * * * * * * * * * * * * * * * 
exports.getCommentByPostId = (req, res) => {
    let postId = req.params.id;
    // console.log('postId: ', postId, typeof(postId));
    Comment
        .find({postId: postId})
        .exec()
        .then(comments => {
            res.json({
                comments: comments.map(comment => comment.apiRepr())
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal server error');
        });

};

// * * * * * * * * * * * * * * * 
// GET all Reply Comments by Comment ID
// * * * * * * * * * * * * * * * 
exports.getReplyCommentsByCommentId = (req, res) => {
    let commentId = req.params.id;
    // console.log('commentId: ', commentId, `typeof: ${typeof(commentId)}`);
    Comment
        .find({commentId: commentId})
        .exec()
        .then(comments => {
            res.json({
                comments: comments.map(comment => comment.apiRepr())
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal server error');
        });
}

// * * * * * * * * * * * * * * * 
// UPDATE comment
// * * * * * * * * * * * * * * * 
exports.updateComment = (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        return res.status(400).json({
        error: 'Request path id and request body id values must match'
        });
    }
    const updated = {};
    const updateableFields = ['content', 'likes'];
    updateableFields.forEach(field => {
        if (field in req.body) {
            updated[field] = req.body[field];
        }
    });

    Comment
        .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
        .exec()
        .then(updatedComment => res.status(201).json(updatedComment.apiRepr()))
        .catch(err => res.status(500).json({message: 'Something went wrong'}));
}