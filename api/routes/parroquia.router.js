const express = require('express');
const validatorHandler = require('../middlewares/validator.handler')
const { createParroquiaSchema, getParroquiaSchema, updateParroquiaSchema } = require('./../schemas/parroquia.schema')
const ParroquiaService = require('./../services/parroquia.service')

const router = express.Router();
const parroquiaService = new ParroquiaService;

router.get('/', async (request, response, next) => {
  try {
    const users = await parroquiaService.get()
    response.json(users)
  } catch (error) {
    next(error);
  }
})


router.get('/:id',
  validatorHandler(getParroquiaSchema, 'params'),
  async (request, response, next) => {
  try {
    const {id} = request.params;
    const users = await parroquiaService.getByState(id)
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/search', async (request, response, next) => {
  try {
    const body = request.body;
    res = await parroquiaService.search(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.post('/', validatorHandler(createParroquiaSchema, 'body') ,async (request, response, next) => {
  try {
    const body = request.body;
    res = await parroquiaService.create(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.patch('/:id',
  validatorHandler(getParroquiaSchema, 'params'),
  validatorHandler(updateParroquiaSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const {id} = request.params;
    res = await parroquiaService.update(id, body)
    response.status(200).json({status:'ok',data:res})
  }
)

router.delete('/:id',
  validatorHandler(getParroquiaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await parroquiaService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
