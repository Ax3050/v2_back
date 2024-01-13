const express = require('express');
const validatorHandler = require('../middlewares/validator.handler')
const { createMunicipioSchema, updateMunicipioSchema, getMunicipioSchema } = require('./../schemas/municipio.schema')
const MunicipioService = require('./../services/municipio.service')

const router = express.Router();
const municipioService = new MunicipioService;

router.get('/', async (request, response, next) => {
  try {
    const users = await municipioService.get()
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.get('/:id',
  validatorHandler(getMunicipioSchema, 'params'),
  async (request, response, next) => {
  try {
    const {id} = request.params;
    const users = await municipioService.getByState(id)
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/search',async (request, response, next) => {
  try {
    const body = request.body;
    res = await municipioService.search(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})


router.post('/', validatorHandler(createMunicipioSchema, 'body') ,async (request, response, next) => {
  try {
    const body = request.body;
    res = await municipioService.create(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.patch('/:id',
  validatorHandler(getMunicipioSchema, 'params'),
  validatorHandler(updateMunicipioSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const {id} = request.params;
    res = await municipioService.update(id, body)
    response.status(200).json({status:'ok',data:res})
  }
)

router.delete('/:id',
  validatorHandler(getMunicipioSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await municipioService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
