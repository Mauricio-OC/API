const models = require('../models');
const { statusCode, errorMessages } = require('../middlewares/errors');

const createService = async (title, content, categoryIds, user) => {
    try {
        const categories = await models.Category.findAll({ where: { id: categoryIds } });
        
        if (categories.length !== categoryIds.length) {
            const error = new Error(errorMessages.CATEGORY_ID_NOT_FOUND);
            error.statusCode = statusCode.INVALID_REQUEST;

            return error;
        }
        
        const post = await models.BlogPost.create({ title, content, userId: user.id });
        
        const postCategories = categoryIds
            .map((categoryId) => ({ categoryId, postId: post.id }));

        await models.PostCategory.bulkCreate(postCategories);

        return post;
    } catch (error) {
        return { statusCode: statusCode.INTERNAL_ERROR, message: error.message };
    }
};

const getAllPosts = async () => {
    try {
        const posts = await models.BlogPost.findAll({
            include: [
                { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
                { model: models.Category, as: 'categories', through: { attributes: [] } },
            ],
        });

        return posts;
    } catch (error) {
        return { statusCode: statusCode.INTERNAL_ERROR, message: error.message };
    }
};

const getPostById = async (id) => {
    try {
        const post = await models.BlogPost.findByPk(
            id,
            { include: [
                    { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
                    { model: models.Category, as: 'categories', through: { attributes: [] } },
                ],
            },
        );

        if (!post) {
            const error = new Error(errorMessages.POST_NOT_FOUND);
            error.statusCode = statusCode.NOT_FOUND;

            return error;
        }

        return post;
    } catch (error) {
        return { statusCode: statusCode.INTERNAL_ERROR, message: error.message };
    }
};

const searchPost = async (parameter) => {
    try {
        const posts = await models.BlogPost.findAll({
            where: {
                [models.Sequelize.Op.or]: [
                    { title: { [models.Sequelize.Op.like]: `%${parameter}%` } },
                    { content: { [models.Sequelize.Op.like]: `%${parameter}%` } },
                ],
            },
            include: [
                { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
                { model: models.Category, as: 'categories', through: { attributes: [] } },
            ],
        });

        return posts;
    } catch (error) {
        return { statusCode: statusCode.INTERNAL_ERROR, message: error.message };
    }
};

const handleError = (post, user) => {
    if (!post) {
        const error = new Error();
        error.message = errorMessages.POST_NOT_FOUND;
        error.statusCode = statusCode.NOT_FOUND;

        return error;
    }

    if (post.userId !== user.id) {
        console.log('user.id is:', user.id);
        console.log('userId is:', post.userId);
        const error = new Error(errorMessages.UNAUTHORIZED);
        error.statusCode = statusCode.UNAUTHORIZED;

        return error;
    }

    return null;
};

const updatePostById = async (id, title, content, user) => {
    console.log('user is:', user);
    try {
        const post = await models.BlogPost.findByPk(id, { include: [
                    { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
                    { model: models.Category, as: 'categories', through: { attributes: [] } },
                ],
            });

        const error = handleError(post, user);

        if (error) {
            return error;
        }

        await post.update({ title, content });

        return post;
    } catch (error) {
        return { statusCode: statusCode.INTERNAL_ERROR, message: error.message };
    }
};

const deletePostById = async (id, user) => {
    try {
        const post = await models.BlogPost.findByPk(id);

        const error = handleError(post, user);

        if (error) {
            return error;
        }

        await post.destroy();

        return true;
    } catch (error) {
        return { statusCode: statusCode.INTERNAL_ERROR, message: error.message };
    }
};

module.exports = { 
    createService,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById,
    searchPost,
};