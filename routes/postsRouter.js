'use strict';

const express    = require('express');
const bodyParser = require('body-parser');

const router     = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));



const postsController = require('../controllers/postsController');

// ==================================================
//   Posts routes
// ==================================================

// GET posts
router.get('/posts', postsController.getPosts) // tested

// GET posts by ID
router.get('/posts/:id', postsController.getPostById); // tested

// UPDATE post
router.put('/posts/:id', postsController.updatePost); // NEEDS testing for up/down votes / content

// CREATE post
router.post('/posts', postsController.createPost); // tested

// REMOVE post
router.delete('/posts/:id', postsController.deletePost) // NEEDS Testing




module.exports = router;





