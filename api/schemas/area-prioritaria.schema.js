const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const pnfId = Joi.number().integer();

const createAreaPrioritariaSchema = Joi.object({
  pnfId: pnfId.required(),
  name: name.required(),
})

const updateAreaPrioritariaSchema = Joi.object({
  pnfId: pnfId.required(),
  name: name.required(),
})
const getAreaPrioritariaSchema = Joi.object({
  id: id.required()
})


module.exports = { createAreaPrioritariaSchema, updateAreaPrioritariaSchema, getAreaPrioritariaSchema }
