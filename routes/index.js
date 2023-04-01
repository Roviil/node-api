const express = require('express');
const router = express.Router();

const post = require('./post/index');
const user = require('./user/index');

router.use('/post', post);
router.use('/user', user);

<<<<<<< HEAD
module.exports = router;
//test용 주석
=======

module.exports = router;

//테스트용 주석
>>>>>>> 158bd02170cd14a2b769cb59e0513068bb9e51e3
