const express = require('express');
const { categoryController } = require('../controllers');
const { tokenAuth } = require('../utils/JWT');
const { midCategoryName } = require('../middlewares/categoryName');

const router = express.Router();

router.post(
    '/',
    tokenAuth,
    midCategoryName,
    categoryController.createCatego,
);

router.get('/', tokenAuth, categoryController.getAllCategory);

module.exports = router;