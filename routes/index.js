const express = require('express');
const router = express.Router();

const post = require('./post/index');
const user = require('./user/index');

router.use('/post', post);
router.use('/user', user);


module.exports = router;
//test용 주석


module.exports = router;

