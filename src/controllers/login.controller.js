const userService = require('../services/login.service');
const { createToken } = require('../auth/authToken');

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await userService.login(email, password);

  if (!result) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = createToken(result);

  return res.status(200).json({ token });
};

module.exports = { login };