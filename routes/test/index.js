const express = require('express');
const router = express.Router();
const controller = require('./test.controller');

/* GET users listing. */
router.get('/test-post', controller.test);
router.get('/test/info', controller.testget)

module.exports = router;