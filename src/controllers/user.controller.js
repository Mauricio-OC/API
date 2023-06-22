const userService = require('../services/user.service');
const { createToken } = require('../auth/authToken');

const addUser = async (req, res) => {
  const { email, displayName, image, password } = req.body;

  const hasEmail = await userService.verifyEmail(email);

  if (hasEmail) {
    return res.status(409).json({ message: 'User already registered' });
  }

  const data = { email, displayName, image, password };
  const result = await userService.addUser(data);
  const token = createToken(result);

  return res.status(201).json({ token });
};

const findAllUsers = async (req, res) => {
  const result = await userService.findAllUsers();

  return res.status(200).json(result);
};

const findUserById = async (req, res) => {
  const userId = req.params.id;

  const result = await userService.findUserById(userId);

  if (!result) return res.status(404).json({ message: 'User does not exist' });

  return res.status(200).json(result);
};

const deleteUser = async (req, res) => {
  const { id } = req.payload;
console.log(req.payload);
  await userService.deleteUser(id);
  return res.status(204).end();
};

module.exports = {
  addUser,
  findAllUsers,
  findUserById,
  deleteUser,
};