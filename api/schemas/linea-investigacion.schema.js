const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const AreaPrioritariaId = Joi.number().integer();

const createLineaInvestigacionSchema = Joi.object({
  name: name.required(),
  AreaPrioritariaId:AreaPrioritariaId
})

const updateLineaInvestigacionSchema = Joi.object({
  name: name.required(),
  AreaPrioritariaId:AreaPrioritariaId
})
const getLineaInvestigacionSchema = Joi.object({
  id: id.required()
})

module.exports = { createLineaInvestigacionSchema, updateLineaInvestigacionSchema, getLineaInvestigacionSchema }
