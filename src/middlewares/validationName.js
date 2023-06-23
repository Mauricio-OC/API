const { registerUserSchema } = require('./validation/schema');
const { statusCode } = require('./errors');

const middName = async (req, res, next) => {
  try {
    const { error } = registerUserSchema.validate(req.body);

    if (error) {
      return res.status(statusCode.INVALID_REQUEST).send({ message: error.details[0].message });
    }

    return next();
  } catch (error) {
    return res.status(statusCode.INTERNAL_ERROR).send({ message: statusCode.INTERNAL_ERROR });
  }
};

module.exports = { 
  middName,
};