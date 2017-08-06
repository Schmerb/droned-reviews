'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

// router.use(bodyParser());
router.use(bodyParser.urlencoded({ extended: true }));



const mainController = require('../controllers/mainController');
const feedUpdateController = require('../controllers/feedUpdateController');


const postsRouter = require('./postsRouter');
const commentsRouter = require('./commentsRouter');
const usersRouter = require('./usersRouter');

// routes for app

router.get('/', mainController.getIndex);
// RSS Feed
router.get('/feed', feedUpdateController.getFeed);

// send all traffic to /posts/(:id)/comments to commentsRouter
router.all(['/posts/comments',
            '/posts/comments/:id',
            '/posts/comments/:id/comments',
            '/posts/:id/comments'], commentsRouter);

            
// send all traffic to /posts/(:id) to postsRouter
router.all(['/posts/', 
            '/posts/:id'], postsRouter);



router.use('/users/', usersRouter);



module.exports = router;