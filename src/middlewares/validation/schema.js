const Joi = require('joi');
const { errorMessages } = require('../errors');

const messagesFieldsRequired = {
    'string.base': errorMessages.FIELDS_REQUIRED,
    'string.empty': errorMessages.FIELDS_REQUIRED,
    'string.min': errorMessages.FIELDS_REQUIRED,
    'string.max': errorMessages.FIELDS_REQUIRED,
    'any.required': errorMessages.FIELDS_REQUIRED,
    'string.pattern.base': errorMessages.FIELDS_REQUIRED,
    'object.base': errorMessages.FIELDS_REQUIRED,
};

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  }).messages(messagesFieldsRequired);

const registerUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().min(8).required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const categoryRegisterSchema = Joi.object({
  name: Joi.string().required(),
}).required();

const postSchema = Joi.object({
  title: Joi.string().required(), 
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()).required(),
}).messages(messagesFieldsRequired);

const updatePostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
}).messages(messagesFieldsRequired);

module.exports = {
  loginSchema,
  registerUserSchema,
  categoryRegisterSchema,
  postSchema,
  updatePostSchema,
};