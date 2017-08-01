'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const postsRouter = require('./postsRouter');
const commentsRouter = require('./commentsRouter');


const mainController = require('../controllers/mainController');
const feedUpdateController = require('../controllers/feedUpdateController');

const router = express.Router();

router.use(bodyParser.json());

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





module.exports = router;