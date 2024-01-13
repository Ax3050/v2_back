const express = require('express');

const validatorHandler = require('../middlewares/validator.handler')
const { createPnfSchema, updatePnfSchema, getPnfSchema, validateCode } = require('./../schemas/pnf.schema')
const PnfService = require('./../services/pnf.services')

const router = express.Router();
const pnfService = new PnfService;


router.get('/', async (request, response, next) => {
  try {
    const users = await pnfService.get()
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/', validatorHandler(createPnfSchema, 'body'),
  validateCode,
  async (request, response, next) => {
  try {
    const body = request.body;
    res = await pnfService.create(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.post('/search', async (request, response, next) => {
  try {
    const body = request.body;
    res = await pnfService.search(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.patch('/:id',
  validatorHandler(getPnfSchema, 'params'),
  validatorHandler(updatePnfSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const {id} = request.params;
    res = await pnfService.update(id, body)
    response.status(200).json({status:'ok',data:res})
  }
)

router.delete('/:id',
  validatorHandler(getPnfSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await pnfService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
