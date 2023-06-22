const express = require('express');

const userController = require('../controllers/user.controller');
const validateDisplayName = require('../middlewares/validateDisplayName');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const router = express.Router();

router.post('/', validateDisplayName, validateEmail, validatePassword, userController.addUser);
