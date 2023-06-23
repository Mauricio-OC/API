const { statusCode: { INVALID_REQUEST } } = require('./errors');
const { loginSchema } = require('./validation/schema');

const middEmail = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(INVALID_REQUEST).json({ message: error.details[0].message });
  }

  return next();
};

module.exports = { 
  middEmail,
};