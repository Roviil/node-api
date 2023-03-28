const express = require('express');
const router = express.Router();

const post = require('./post/index');
const user = require('./user/index')
const test = require('./test/index')

router.use('/post', post);
router.use('/user', user);
router.use('/test', test);

module.exports = router;

//테스트용 주석