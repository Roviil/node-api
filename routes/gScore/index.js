const express = require('express');
const router = express.Router();
const controller = require('./gScore.controller');

router.get('/',controller.post);
router.get('/info',controller.gsinfo);
router.get('/user',controller.getUserInfo);
router.get('/posts',controller.getPosts);

router.post('/write',controller.write);

module.exports = router;
