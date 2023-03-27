const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

/* GET users listing. */
router.get('/', controller.user);
router.get('/info', controller.info);
router.get('/login', controller.login);

module.exports = router;