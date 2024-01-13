const express = require('express');

const validatorHandler = require('../middlewares/validator.handler')
const { createLineaInvestigacionSchema, updateLineaInvestigacionSchema, getLineaInvestigacionSchema } = require('./../schemas/linea-investigacion.schema')
const LineaInvestigacionService = require('./../services/linea-investigacion.service')

const router = express.Router();
const lineaInvestigacionService = new LineaInvestigacionService;


router.get('/', async (request, response, next) => {
  try {
    const users = await lineaInvestigacionService.get()
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.get('/find/:id', async (request, response, next) => {
  try {
    const {id} = request.params;
    const users = await lineaInvestigacionService.find(id)
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/search', async (request, response, next) => {
  try {
    const body = request.body;
    res = await lineaInvestigacionService.search(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.post('/', validatorHandler(createLineaInvestigacionSchema, 'body') ,async (request, response, next) => {
  try {
    const body = request.body;
    res = await lineaInvestigacionService.create(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.patch('/:id',
  validatorHandler(getLineaInvestigacionSchema, 'params'),
  validatorHandler(updateLineaInvestigacionSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const {id} = request.params;
    res = await lineaInvestigacionService.update(id, body)
    response.status(200).json({status:'ok',data:res})
  }
)

router.delete('/:id',
  validatorHandler(getLineaInvestigacionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await lineaInvestigacionService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
