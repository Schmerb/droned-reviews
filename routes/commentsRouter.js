'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const commentsController = require('../controllers/commentsController');

const router = express.Router();
router.use(bodyParser());
router.use(bodyParser.json());



// Comments

// tested
router.put('/posts/comments/:id', commentsController.updateComment);



router.get('/posts/comments/:id/comments', commentsController.getReplyCommentsByCommentId); // Need tests


router.get('/posts/comments/:id', commentsController.getCommentById); // Need tests


router.get('/posts/:id/comments', commentsController.getCommentByPostId); // Need tests

// tested
router.get('/posts/comments', commentsController.getComments);

// tested
router.post('/posts/comments', commentsController.createComment);

module.exports = router;