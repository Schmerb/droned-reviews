'use strict';

const express                       = require('express'),
      bodyParser                    = require('body-parser'),
      { checkSessionCookieVisited } = require('../services/cookieCheck');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

// controllers
const mainController       = require('../controllers/mainController'),
      feedUpdateController = require('../controllers/feedUpdateController');

// routers
const postsRouter    = require('./postsRouter'),
      commentsRouter = require('./commentsRouter'),
      usersRouter    = require('./usersRouter'),
      fileRouter     = require('./fileRouter'),
      dronesRouter   = require('./dronesRouter');


// routes for app

// main page -- middleware redirects to /welcome page if first visit
router.get('/', checkSessionCookieVisited, mainController.getIndex);

// Landing Page * CAPSTONE PROJECT ONLY *
router.get('/welcome', mainController.getLanding);

// mission page
router.get('/mission', mainController.getMission);

// RSS Feed
router.get('/feed', feedUpdateController.getFeed);
router.get('/feed-data', feedUpdateController.getFeedData);

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


  