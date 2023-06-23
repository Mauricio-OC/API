const express = require('express');
const { loginController } = require('../controllers');
const { middEmail } = require('../middlewares/validationEmail');

const router = express.Router();

router.post(
'/',
  middEmail,
  loginController.logIn,
);

module.exports = router;