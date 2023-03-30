const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

/* GET users listing. */
router.get('/', controller.user);
router.get('/info', controller.info);
router.get('/login', controller.login);
router.post('/logintest', controller.logintest);


module.exports = router;