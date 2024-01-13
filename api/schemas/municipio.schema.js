const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const estadoId= Joi.number().integer();

const createMunicipioSchema = Joi.object({
  name: name.required(),
  estadoId: estadoId.required(),
})

const updateMunicipioSchema = Joi.object({
  name: name.required(),
  estadoId: estadoId,
})
const getMunicipioSchema = Joi.object({
  id: id.required()
})


module.exports = { createMunicipioSchema, updateMunicipioSchema, getMunicipioSchema }
