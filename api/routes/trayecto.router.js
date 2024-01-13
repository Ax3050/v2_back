const express = require('express');

const validatorHandler = require('../middlewares/validator.handler')
const { createTrayectoSchema, updateTrayectoSchema, getTrayectoSchema } = require('./../schemas/trayecto.schema')
const TrayectoService = require('./../services/trayecto.service')

const router = express.Router();
const trayectoService = new TrayectoService;


router.get('/', async (request, response, next) => {
  try {
    const users = await trayectoService.get()
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/', validatorHandler(createTrayectoSchema, 'body') ,async (request, response, next) => {
  try {
    const body = request.body;
    res = await trayectoService.create(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.patch('/:id',
  validatorHandler(getTrayectoSchema, 'params'),
  validatorHandler(updateTrayectoSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const {id} = request.params;
    res = await trayectoService.update(id, body)
    response.status(200).json({status:'ok',data:res})
  }
)

router.delete('/:id',
  validatorHandler(getTrayectoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await trayectoService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
