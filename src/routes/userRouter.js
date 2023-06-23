const express = require('express');
const { userController } = require('../controllers');
const { tokenAuth } = require('../utils/JWT');
const { middName } = require('../middlewares/validationName');

const router = express.Router();

router.post(
  '/', 
  middName,
  userController.register,
);

router.get(
  '/', 
  tokenAuth,
  userController.getUsers,
);

router.get(
  '/:id',
  tokenAuth,
  userController.getById,
);
router.delete(
  '/me',
  tokenAuth,
  userController.deleteControll,
);

module.exports = router;