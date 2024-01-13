const express = require('express');
const validatorHandler = require('../middlewares/validator.handler')
const { createSeccionSchema, updateSeccionSchema, getSeccionSchema } = require('./../schemas/seccion.schema')
const SeccionService = require('./../services/seccion.service')

const router = express.Router();
const seccionService = new SeccionService;

router.get('/', async (request, response, next) => {
  try {
    const secciones = await seccionService.get()
    response.json(secciones)
  } catch (error) {
    next(error);
  }
})

router.get('/:id/:trayectoId',
  validatorHandler(getSeccionSchema, 'params'),
  async (request, response, next) => {
  try {
    const {id, trayectoId} = request.params;
    const secciones = await seccionService.getByPnf(id,trayectoId)
    response.json(secciones)
  } catch (error) {
    next(error);
  }
})


router.post('/search', async (request, response, next) => {
  try {
    const body = request.body;

    const secciones = await seccionService.search(body)
    response.json(secciones)
  } catch (error) {
    next(error);
  }
})

router.post('/', validatorHandler(createSeccionSchema, 'body') ,async (request, response, next) => {
  try {
    const body = request.body;
    res = await seccionService.create(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.patch('/:id',
  validatorHandler(getSeccionSchema, 'params'),
  validatorHandler(updateSeccionSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const {id} = request.params;
    res = await seccionService.update(id, body)
    response.status(200).json({status:'ok',data:res})
  }
)

router.delete('/:id',
  validatorHandler(getSeccionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await seccionService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
