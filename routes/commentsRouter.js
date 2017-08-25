'use strict';

const express    = require('express');
const bodyParser = require('body-parser');

const commentsController = require('../controllers/commentsController');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());




// ==================================================
//   COMMENTS routes
// ==================================================


router.put('/posts/comments/:id', commentsController.updateComment);



router.get('/posts/comments/:id/comments', commentsController.getReplyCommentsByCommentId); 


router.get('/posts/comments/:id', commentsController.getCommentById); 


router.get('/posts/:id/comments', commentsController.getCommentByPostId); 


router.get('/posts/comments', commentsController.getComments);


router.post('/posts/comments', commentsController.createComment);

module.exports = router;