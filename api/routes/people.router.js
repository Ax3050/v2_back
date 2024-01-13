const express = require('express');

const validatorHandler = require('../middlewares/validator.handler')
const { createPeopleSchema, getPeopleSchema, validateCedula, updatePeopleSchema} = require('./../schemas/people.schema')
const PeopleService = require('./../services/people.service');
const { validateExp } = require('../schemas/investigator.schema');

const router = express.Router();
const peopleService = new PeopleService;


router.get('/', async (request, response, next) => {
  try {
    const {page} = request.query;
    const users = await peopleService.get(page)
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.patch('/:id',
  validatorHandler(getPeopleSchema, 'params'),
  validatorHandler(updatePeopleSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const {id} = request.params;
    res = await peopleService.update(id, body)
    response.status(200).json({status:'ok',data:res})
  }
)

router.post('/',
  validatorHandler(createPeopleSchema, 'body'),
  validateCedula,
  async (request, response, next) => {
  try {
    const body = request.body;
    res = await peopleService.create(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.delete('/:id',
  validatorHandler(getPeopleSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await peopleService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
