const express = require('express');
const { postController } = require('../controllers');
const { tokenAuth } = require('../utils/JWT');
const { validationPost, validationUpPost } = require('../middlewares/validationPost');

const router = express.Router();

router.get(
    '/search',
    tokenAuth,
    postController.searchPost,
);

router.get(
    '/:id', 
    tokenAuth,
    postController.getPostById,
);

router.get(
    '/',
    tokenAuth,
    postController.getAllPosts,
);

router.post(
    '/', 
    tokenAuth,
    validationPost,
    postController.createPost,
);

router.put(
    '/:id',
    tokenAuth,
    validationUpPost,
    postController.updatePostById,
);

router.delete(
    '/:id',
    tokenAuth,
    postController.deletePost,
);

module.exports = router;