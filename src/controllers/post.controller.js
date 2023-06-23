const { statusCode } = require('../middlewares/errors');
const { postService } = require('../services');

const createPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { user } = req;

    try {
        const post = await postService.createService(title, content, categoryIds, user.user);

        if (post.statusCode) {
            const error = post;
            return res.status(error.statusCode).json({ message: error.message });
        }

        return res.status(statusCode.SUCCESFULLY_CREATED).json(post);
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({ message: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();

        if (posts.statusCode) {
            const error = posts;
            return res.status(error.statusCode).json({ message: error.message });
        }

        return res.status(statusCode.SUCESS).json(posts);
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({ message: error.message });
    }
};

const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await postService.getPostById(id);

        if (post.statusCode) {
            const error = post;
            return res.status(error.statusCode).json({ message: error.message });
        }

        return res.status(statusCode.SUCESS).json(post);
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({ message: error.message });
    }
};

const updatePostById = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const { user } = req;
    try {
        const updatedPost = await postService.updatePostById(id, title, content, user.user);

        if (updatedPost.statusCode) {
            const error = updatedPost;
            return res.status(error.statusCode).json({ message: error.message });
        }

        return res.status(statusCode.SUCESS).json(updatedPost);
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    try {
        const deletedPost = await postService.deletePostById(id, user.user);

        if (deletedPost.statusCode) {
            const error = deletedPost;
            return res.status(error.statusCode).json({ message: error.message });
        }

        return res.status(statusCode.DELETED).json();
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({ message: error.message });
    }
};

const searchPost = async (req, res) => {
    console.log('req.body is:', req.body);
    const { q } = req.query;

    try {
        const posts = await postService.searchPost(q);

        if (posts.statusCode) {
            const error = posts;
            return res.status(error.statusCode).json({ message: error.message });
        }

        return res.status(statusCode.SUCESS).json(posts);
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({ message: error.message });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePost,
    searchPost,
};