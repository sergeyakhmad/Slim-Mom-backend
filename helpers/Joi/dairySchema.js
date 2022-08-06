const Joi = require("joi");

exports.addDairyValidation = Joi.object({
  productId: Joi.string().required(),
  weight: Joi.number().required(),
  date: Joi.string().required(),
  title: Joi.string(),
});

exports.deleteDairyValidation = Joi.object({
  _id: Joi.string().required(),
  date: Joi.string().required(),
  owner: Joi.string(),
});
