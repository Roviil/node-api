const express = require('express');
const router = express.Router();

const post = require('./post/index');
const user = require('./user/index');

router.use('/post', post);
router.use('/user', user);


module.exports = router;

//테스트용 주석