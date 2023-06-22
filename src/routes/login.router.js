const express = require('express');

const router = express.Router();

const LoginController = require('../controllers/login.controller');
const validateDisplayName = require('../middlewares/validateDisplayName');

router.post('/', validateDisplayName, LoginController.login);

module.exports = router;