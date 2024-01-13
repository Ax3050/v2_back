const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();

const createEstadoSchema = Joi.object({
  name: name.required(),
})

const updateEstadoSchema = Joi.object({
  name: name.required(),
})
const getEstadoSchema = Joi.object({
  id: id.required()
})


module.exports = { createEstadoSchema, updateEstadoSchema, getEstadoSchema }
