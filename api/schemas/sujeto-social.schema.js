const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const DimensionEspacialId= Joi.number().integer();

const createSujetoSocialSchema = Joi.object({
  name: name.required(),
  DimensionEspacialId: DimensionEspacialId.required(),
})

const updateSujetoSocialSchema = Joi.object({
  name: name.required(),
  DimensionEspacialId: DimensionEspacialId,
})
const getSujetoSocialSchema = Joi.object({
  id: id.required()
})


module.exports = { createSujetoSocialSchema, updateSujetoSocialSchema, getSujetoSocialSchema }
