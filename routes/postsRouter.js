'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const postsController = require('../controllers/postsController');

const router = express.Router();
router.use(bodyParser());

// Posts

router.get('/posts', postsController.getPosts)

router.get('/posts/:id', postsController.getPostById);

router.put('/posts/:id', postsController.updatePost);

router.post('/posts', postsController.createPost);





module.exports = router;