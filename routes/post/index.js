const express = require('express');
const router = express.Router();
const controller = require('./post.controller');

/* GET users listing. */
router.get('/', controller.posts);
router.get('/posts:', controller.postsget);
router.post('/:write', controller.write);
router.get('/comment', controller.comment);
router.get('/comment:', controller.commentget);
router.post('/writetest', controller.writetest);

module.exports = router;