const express = require('express');
const router = express.Router();
const controller = require('./gScore.controller');

router.get('/',controller.post);
router.get('/getType', controller.getType);
router.get('/getInfoByType/:type', controller.getInfoByType);
router.get('/user',controller.getUserInfo);
router.get('/posts',controller.getPosts);
router.get('/assposts',controller.assPosts);
router.get('/maxScore',controller.getMaxScore);
router.get('/fileInfo',controller.getFileInfo);
router.get('/download',controller.downloadFile);
router.get('/writer',controller.getWriterInfo);
router.get('/allUser',controller.getAllUserInfo);
router.get('/getselUserInfo',controller.getselUserInfo);


router.post('/write',controller.write);
router.post('/upload',controller.upload);
router.post('/fileToDB',controller.fileToDB);
router.post('/update', controller.update);
router.post('/insertInfo', controller.insertInfo);
router.post('/updateInfo', controller.updateInfo);
router.post('/updateMaxScore', controller.updateMaxScore);
router.post('/detail', controller.detailscore);
router.post('/allwrite',controller.all_write)
router.post('/asswrite',controller.ass_write)

router.delete('/deleteFile',controller.deleteFile);
router.delete('/deletePost', controller.deletePost);
router.delete('/deleteInfo', controller.deleteInfo);


module.exports = router;
