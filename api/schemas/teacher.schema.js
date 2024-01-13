const Joi = require('joi');
const { createPeopleSchema, updatePeopleSchema } = require('./people.schema');
const id = Joi.number().integer();
const trayectoId = Joi.number().integer();
const pnfId = Joi.number().integer();
const seccionId = Joi.number().integer();
const peopleId = Joi.number().integer();

// createTeacherSchema
const createTeacherSchema =  Joi.array().items(
  Joi.object().keys({
    id:id,
    trayectoId: trayectoId.required(),
    pnfId: pnfId.required(),
    seccionId: seccionId.required(),
    peopleId: peopleId
  })
)


const updateTeacherSchema = Joi.object({
  trayectoId: trayectoId.required(),
  pnfId: pnfId.required(),
  seccionId: seccionId.required(),
  peopleId: peopleId
})
const getTeacherSchema = Joi.object({
  id: id.required()
})


module.exports = { createTeacherSchema, updateTeacherSchema, getTeacherSchema }
