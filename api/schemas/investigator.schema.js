const Joi = require('joi');
const { models } = require('../libs/sequelize');

const { createPeopleSchema, updatePeopleSchema } = require('./people.schema');
const { createUserSchema } = require('./user.schema');
const id = Joi.number().integer();
const exp = Joi.string();
const trayectoId = Joi.number().integer();
const pnfId = Joi.number().integer();
const seccionId = Joi.number().integer();
const academicYearId = Joi.number().integer();
const peopleId = Joi.number().integer();

const createInvestigatorSchema = Joi.object({
  exp: exp,
  trayectoId: trayectoId.required(),
  pnfId: pnfId.required(),
  seccionId: seccionId.required(),
  people: createPeopleSchema,
  academicYearId:academicYearId
})

const registerInvestigatorSchema = Joi.object({
  exp: exp,
  trayectoId: trayectoId.required(),
  pnfId: pnfId.required(),
  seccionId: seccionId.required(),
  people: createPeopleSchema,
  user: createUserSchema
})

const updateInvestigatorSchema = Joi.object({
  exp: exp,
  trayectoId: trayectoId.required(),
  pnfId: pnfId.required(),
  seccionId: seccionId.required(),
  people: updatePeopleSchema,
  academicYearId:academicYearId
})
const getInvestigatorSchema = Joi.object({
  id: id.required()
})


const validateExp = async (req, res, next) => {
  const body = req.body;
  if(!body?.exp){
    next();
    return
  }

  const data = await models.Investigator.findOne({
    where: { exp: body.exp }
  })
  if (data) {
    return res.status(400).json({ error: {mensaje:'el expediente ya ha sido registrado.'} });
  }else{
    next();
  }
}

module.exports = { createInvestigatorSchema, updateInvestigatorSchema, getInvestigatorSchema, registerInvestigatorSchema, validateExp }
