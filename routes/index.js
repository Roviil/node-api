const express = require('express');
const router = express.Router();

const post = require('./post/index');
const user = require('./user/index');
const gScore= require('./gScore/index');
const prof= require('./prof/index');
const subject= require('./subject/index');

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

router.use('/prof',prof);

router.use('/subject',subject);

module.exports = router;

//테스트용 주석