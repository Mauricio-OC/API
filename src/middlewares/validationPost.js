const { statusCode } = require('./errors');
const schema = require('./validation/schema');

const validationPost = (req, res, next) => {
  const { error } = schema.postSchema.validate(req.body);

  if (error) {
    return res
        .status(statusCode.INVALID_REQUEST)
        .json({ message: error.details[0].message });
  }

  next();
};

const validationUpPost = (req, res, next) => {
  const { error } = schema.updatePostSchema.validate(req.body);

  if (error) {
    return res
        .status(statusCode.INVALID_REQUEST)
        .json({ message: error.details[0].message });
  }

  next();
};

module.exports = { 
  validationPost,
  validationUpPost,
};