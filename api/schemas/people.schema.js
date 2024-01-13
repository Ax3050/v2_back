const Joi = require('joi');
const { models } = require('../libs/sequelize');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(20);
const lastname = Joi.string().min(3).max(20);
const nationality = Joi.number().integer().max(1);
const cedula = Joi.string().max(8).min(8);

const createPeopleSchema = Joi.object({
  name: name.required(),
  lastname: lastname.required(),
  nationality: nationality.required(),
  cedula: cedula.required()
})

const updatePeopleSchema = Joi.object({
  name: name,
  lastname: lastname,
  nationality: nationality,
  cedula: cedula
})
const getPeopleSchema = Joi.object({
  id: id.required()
})

const validateCedula = async (req, res, next) => {
  const body = req.body;
  const cedula = body.cedula ?? body.people.cedula;

  const data = await models.People.findOne({
    where: { cedula: cedula }
  })
  if (data) {
    return res.status(400).json({ error: {mensaje:'la cedula ya ha sido registrada.'} });
  }else{
    next();
  }
}




module.exports = { createPeopleSchema, updatePeopleSchema, getPeopleSchema, validateCedula }
