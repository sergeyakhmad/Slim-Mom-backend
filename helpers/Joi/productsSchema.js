const Joi = require("joi");

exports.getDataForBMRValidation = Joi.object({
  height: Joi.string().required(),
  age: Joi.string().required(),
  currentWeight: Joi.string().required(),
  desiredWeight: Joi.string().required(),
  bloodType: Joi.string().required(),
});
