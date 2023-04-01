const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const auth = require('./auth')

/* GET users listing. */
router.get('/', controller.user);
router.get('/info', controller.info);
router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.get('/auth', auth.verifyToken);
router.get('/logout', controller.logout);

module.exports = router;