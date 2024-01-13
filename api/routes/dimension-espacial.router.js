const express = require('express');

const validatorHandler = require('../middlewares/validator.handler')
const { createDimensionEspacialSchema, updateDimensionEspacialSchema, getDimensionEspacialSchema } = require('./../schemas/dimension-espacial.schema')
const DimensionEspacialService = require('./../services/dimension-espacial.service')

const router = express.Router();
const dimensionEspacialService = new DimensionEspacialService;


router.get('/', async (request, response, next) => {
  try {
    const users = await dimensionEspacialService.get()
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.get('/parroquia/:id', async (request, response, next) => {
  try {
    const {id} = request.params;
    const users = await dimensionEspacialService.getByParroquiaId(id)
    response.json(users)
  } catch (error) {
    next(error);
  }
})


router.post('/', validatorHandler(createDimensionEspacialSchema, 'body') ,async (request, response, next) => {
  try {
    const body = request.body;
    res = await dimensionEspacialService.create(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.post('/search',async (request, response, next) => {
  try {
    const body = request.body;
    res = await dimensionEspacialService.search(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.patch('/:id',
  validatorHandler(getDimensionEspacialSchema, 'params'),
  validatorHandler(updateDimensionEspacialSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const {id} = request.params;
    res = await dimensionEspacialService.update(id, body)
    response.status(200).json({status:'ok',data:res})
  }
)

router.delete('/:id',
  validatorHandler(getDimensionEspacialSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await dimensionEspacialService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
