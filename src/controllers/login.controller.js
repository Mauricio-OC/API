const jwt = require('jsonwebtoken');
const { userService } = require('../services');
const { 
  errorMessages,
  statusCode: { INVALID_REQUEST, INTERNAL_ERROR } } = require('../middlewares/errors');

const jwtSecret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const logIn = async (req, res) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await userService.findByEmail(email);
  } catch (e) {
    return res.status(INTERNAL_ERROR).json({ message: e.message });
  }

  if (!user) {
    return res.status(INVALID_REQUEST).json({ message: errorMessages.INVALID_FIELDS });
  }

  const math = password === user.password;

  if (!math) {
    return res.status(INVALID_REQUEST).json({ message: errorMessages.INVALID_FIELDS });
  }

  const token = jwt.sign({ user }, jwtSecret, { expiresIn: '1d' });
  return res.json({ token });
};

module.exports = {
  logIn,
};