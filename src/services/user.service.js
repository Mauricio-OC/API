const { statusCode, errorMessages } = require('../middlewares/errors');
const models = require('../models');

const findByEmail = async (email) => {
  try {
    const user = await models.User
      .findOne({ where: { email } }, { attributes: { exclude: ['password'] } });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const registerUser = async (displayName, email, password, image) => {
  const userExists = await findByEmail(email);
  
  if (userExists) {
    const error = {
      statusCode: statusCode.ALREADY_REGISTERED,
      message: errorMessages.ALREADY_REGISTERED,

    };

    return error;
  }

  try {
    const user = await models.User.create({ displayName, email, password, image });

    return user;
  } catch (error) {
    return { statusCode: statusCode.INTERNAL_ERROR, message: error.message };
  }
};

const getById = async (id) => {
  try {
    const user = await models.User.findByPk(id, { attributes: { exclude: ['password'] } });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const getAll = async () => {
  try {
    const users = await models.User.findAll({ attributes: { exclude: ['password'] } });

    return users;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteControll = async (userId) => {
  console.log('userId is:', userId);
  const user = await getById(userId);

  if (!user || user.id !== userId) {
    const error = {
      statusCode: statusCode.NOT_FOUND,
      message: errorMessages.NOT_FOUND,
    };

    return error;
  }

  try {
    await models.User.destroy({ where: { id: userId } });

    return true;
  } catch (error) {
    return { statusCode: statusCode.INTERNAL_ERROR, message: error.message };
  }
};

module.exports = {
  findByEmail,
  registerUser,
  getById,
  getAll,
  deleteControll,
};