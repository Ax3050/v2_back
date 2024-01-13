const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const parroquiaId= Joi.number().integer();

const createDimensionEspacialSchema = Joi.object({
  name: name.required(),
  parroquiaId: parroquiaId.required(),
})

const updateDimensionEspacialSchema = Joi.object({
  name: name.required(),
  parroquiaId: parroquiaId.required(),

})
const getDimensionEspacialSchema = Joi.object({
  id: id.required()
})


module.exports = { createDimensionEspacialSchema, updateDimensionEspacialSchema, getDimensionEspacialSchema }
