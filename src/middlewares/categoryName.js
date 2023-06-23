const { statusCode } = require('./errors');
const { categoryRegisterSchema } = require('./validation/schema');

const midCategoryName = async (req, res, next) => {
  const { error } = categoryRegisterSchema.validate(req.body);

  if (error) {
    return res.status(statusCode.INVALID_REQUEST).json({ message: error.details[0].message });
  }

  next();
};

module.exports = {
  midCategoryName,
};