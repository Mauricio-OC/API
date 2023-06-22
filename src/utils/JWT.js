const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'suaSenhaSecreta';

const jwtConfig = {
  expiresIn: '1h',
};

const createToken = (payload) => jwt.sign(payload, JWT_SECRET, jwtConfig);

const verifyyToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
  createToken,
  verifyyToken,
};
