const express = require('express');
const router = express.Router();
const controller = require('./gScore.controller');

router.get('/',controller.post);
router.get('/info',controller.gsinfo);
router.get('/user',controller.getUserInfo);
router.get('/posts',controller.getPosts);
router.get('/maxScore',controller.getMaxScore);
router.get('/fileInfo',controller.getFileInfo);

router.post('/write',controller.write);
router.post('/upload',controller.upload);


module.exports = router;
