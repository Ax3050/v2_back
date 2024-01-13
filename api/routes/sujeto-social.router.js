const express = require('express');
const validatorHandler = require('../middlewares/validator.handler')
const { createSujetoSocialSchema, updateSujetoSocialSchema, getSujetoSocialSchema } = require('./../schemas/sujeto-social.schema')
const SujetoSocialService = require('./../services/sujeto-social.service')

const router = express.Router();
const sujetoSocialService = new SujetoSocialService;

router.get('/', async (request, response, next) => {
  try {
    const users = await sujetoSocialService.get()
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.get('/:id',
  validatorHandler(getSujetoSocialSchema, 'params'),
  async (request, response, next) => {
  try {
    const {id} = request.params;
    const users = await sujetoSocialService.getByState(id)
    response.json(users)
  } catch (error) {
    next(error);
  }
})


router.get('/find/:id', async (request, response, next) => {
  try {
    const {id} = request.params;
    const users = await sujetoSocialService.find(id)
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/', validatorHandler(createSujetoSocialSchema, 'body') ,async (request, response, next) => {
  try {
    const body = request.body;
    res = await sujetoSocialService.create(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.patch('/:id',
  validatorHandler(getSujetoSocialSchema, 'params'),
  validatorHandler(updateSujetoSocialSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const {id} = request.params;
    res = await sujetoSocialService.update(id, body)
    response.status(200).json({status:'ok',data:res})
  }
)

router.delete('/:id',
  validatorHandler(getSujetoSocialSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await sujetoSocialService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
