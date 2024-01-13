const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();

const createTrayectoSchema = Joi.object({
  name: name.required(),
})

const updateTrayectoSchema = Joi.object({
  name: name.required(),
})
const getTrayectoSchema = Joi.object({
  id: id.required()
})


module.exports = { createTrayectoSchema, updateTrayectoSchema, getTrayectoSchema }
