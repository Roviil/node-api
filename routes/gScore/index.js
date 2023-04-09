const express = require('express');
const router = express.Router();
const controller = require('./gScore.controller');

router.get('/',controller.post);
router.get('/info',controller.gsinfo);
router.post('/write',controller.write);
//router.get('/filter',controller.filter);
//router.get('/testapi',controller.testapi);

module.exports = router;
