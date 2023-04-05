const express = require('express');
const router = express.Router();
const controller = require('./notice.controller');

/* GET users listing. */
router.get('/', controller.notices);
router.get('/talks', controller.noticesget);
router.post('/write', controller.write);


module.exports = router;