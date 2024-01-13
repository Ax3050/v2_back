const express = require('express');

const validatorHandler = require('../middlewares/validator.handler')
const { createAreaPrioritariaSchema, updateAreaPrioritariaSchema, getAreaPrioritariaSchema } = require('./../schemas/area-prioritaria.schema')
const AreaPrioritariaService = require('./../services/area-prioritaria.service')

const router = express.Router();
const areaPrioritariaService = new AreaPrioritariaService;


router.get('/', async (request, response, next) => {
  try {
    const users = await areaPrioritariaService.get()
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.get('/pnf/:id', async (request, response, next) => {
  try {
    const {id} = request.params;
    const users = await areaPrioritariaService.getByPnf(id)
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/search', async (request, response, next) => {
  try {
    const body = request.body;
    const users = await areaPrioritariaService.search(body)
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/', validatorHandler(createAreaPrioritariaSchema, 'body') ,async (request, response, next) => {
  try {
    const body = request.body;
    res = await areaPrioritariaService.create(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.patch('/:id',
  validatorHandler(getAreaPrioritariaSchema, 'params'),
  validatorHandler(updateAreaPrioritariaSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const {id} = request.params;
    res = await areaPrioritariaService.update(id, body)
    response.status(200).json({status:'ok',data:res})
  }
)

router.delete('/:id',
  validatorHandler(getAreaPrioritariaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await areaPrioritariaService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
