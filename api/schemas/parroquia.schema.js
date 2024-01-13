const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const municipioId= Joi.number().integer();

const createParroquiaSchema = Joi.object({
  name: name.required(),
  municipioId: municipioId.required(),
})

const updateParroquiaSchema = Joi.object({
  name: name.required(),
  municipioId: municipioId,
})
const getParroquiaSchema = Joi.object({
  id: id.required()
})


module.exports = { createParroquiaSchema, updateParroquiaSchema, getParroquiaSchema }
