'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const commentsController = require('../controllers/commentsController');

const router = express.Router();
router.use(bodyParser());
router.use(bodyParser.json());


// Comments
router.put('/posts/comments/:id', commentsController.updateComment);



router.get('/posts/comments/:id/comments', commentsController.getReplyCommentsByCommentId);


router.get('/posts/comments/:id', commentsController.getCommentById);

// tested
router.get('/posts/:id/comments', commentsController.getCommentByPostId);

// tested
router.get('/posts/comments', commentsController.getComments);

router.post('/posts/comments', commentsController.createComment);


module.exports = router;