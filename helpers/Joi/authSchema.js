const Joi = require("joi");

exports.loginUserValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(18).required(),
});

exports.addUserValidation = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(18).required(),
});
