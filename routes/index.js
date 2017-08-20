'use strict';

const express    = require('express'),
      bodyParser = require('body-parser');
const router     = express.Router();

// router.use(bodyParser());
router.use(bodyParser.urlencoded({ extended: true }));


const mainController       = require('../controllers/mainController');
const feedUpdateController = require('../controllers/feedUpdateController');


const postsRouter    = require('./postsRouter');
const commentsRouter = require('./commentsRouter');
const usersRouter    = require('./usersRouter');
const fileRouter     = require('./fileRouter');
const dronesRouter   = require('./dronesRouter');

// routes for app

// main page
router.get('/', mainController.getIndex);

// mission page
router.get('/mission', mainController.getMission);

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


router.use('/file', fileRouter);


router.use('/drones', dronesRouter);


module.exports = router;