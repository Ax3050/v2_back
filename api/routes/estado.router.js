const express = require('express');
const validatorHandler = require('../middlewares/validator.handler')
const { createEstadoSchema, updateEstadoSchema, getEstadoSchema } = require('./../schemas/estado.schema')
const EstadoService = require('./../services/estado.service')

const router = express.Router();
const estadoService = new EstadoService;

router.get('/', async (request, response, next) => {
  try {
    const users = await estadoService.get()
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/search', async (request, response, next) => {
  try {
    const body = request.body;
    res = await estadoService.search(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.post('/', validatorHandler(createEstadoSchema, 'body') ,async (request, response, next) => {
  try {
    const body = request.body;
    res = await estadoService.create(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.patch('/:id',
  validatorHandler(getEstadoSchema, 'params'),
  validatorHandler(updateEstadoSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const {id} = request.params;
    res = await estadoService.update(id, body)
    response.status(200).json({status:'ok',data:res})
  }
)

router.delete('/:id',
  validatorHandler(getEstadoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await estadoService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
