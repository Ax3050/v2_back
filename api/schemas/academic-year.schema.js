const Joi = require('joi');
const { models } = require('../libs/sequelize');

const id = Joi.number().integer();
const year = Joi.string();

const createAcademicYearSchema = Joi.object({
  year: year.required(),
})

const updateAcademicYearSchema = Joi.object({
  year: year.required(),
})
const getAcademicYearSchema = Joi.object({
  id: id.required()
})

const validateAcademicYear = async (req, res, next) => {
  const body = req.body;

  const data = await models.AcademicYear.findOne({
    where: { year: body.year }
  })
  if (data) {
    return res.status(400).json({ error: {mensaje:'el año académico ya ha sido registrado.'} });
  }else{
    next();
  }
}

module.exports = { createAcademicYearSchema, updateAcademicYearSchema, getAcademicYearSchema, validateAcademicYear }
