const express = require('express');
const router = express.Router();

const post = require('./post/index');
const user = require('./user/index');
const gScore= require('./gScore/index');

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: 게시글, 댓글 CRUD
 */
router.use('/post', post);


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 추가 수정 삭제 조회
 */
router.use('/user', user);

router.use('/gScore',gScore);

module.exports = router;

//테스트용 주석