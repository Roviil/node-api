const express = require('express');
const router = express.Router();
const controller = require('./post.controller');

/* GET users listing. */
router.get('/', controller.posts);
router.get('/posts:', controller.postsget);


module.exports = router;