const express = require('express');
const router = express.Router();

const post = require('./post.js');
const user = require('./user.js')

router.use('/post', post);
router.use('/user', user);

module.exports = router;