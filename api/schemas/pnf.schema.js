const Joi = require('joi');
const { models } = require('../libs/sequelize');

const id = Joi.number().integer();
const name = Joi.string();
const code = Joi.string();
const trayectos = Joi.string();

const createPnfSchema = Joi.object({
  name: name.required(),
  code: code.required(),
  trayectos: trayectos.required(),
})

const updatePnfSchema = Joi.object({
  name: name.required(),
  code: code.required(),
  trayectos: trayectos.required(),
})
const getPnfSchema = Joi.object({
  id: id.required()
})


const validateCode = async (req, res, next) => {
  const {code} = req.body;

  const data = await models.Pnf.findOne({
    where: { code }
  })
  if (data) {
    return res.status(400).json({ message:'el código ya ha sido registrado.'});
  }else{
    next();
  }
}

module.exports = { createPnfSchema, updatePnfSchema, getPnfSchema, validateCode }
