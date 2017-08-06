'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser());



const postsController = require('../controllers/postsController');


// Posts

// tested
router.get('/posts', postsController.getPosts)

// tested
router.get('/posts/:id', postsController.getPostById);

// tested
router.put('/posts/:id', postsController.updatePost); // NEEDS testing for up/down votes

// tested
router.post('/posts', postsController.createPost);


module.exports = router;





