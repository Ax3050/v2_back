const express = require('express');

const validatorHandler = require('../middlewares/validator.handler')
const {createUserSchema, getUserSchema, updateUserSchema, validateEmail} = require('../schemas/user.schema')
const UserService = require('./../services/user.service')

const router = express.Router();
const userService = new UserService

router.get('/', async (request, response, next) => {
  try {
    const users = await userService.get()
    response.json(users)
  } catch (error) {
    next(error);
  }
})


router.post('/sendEmail',
  async (request, response, next) => {
    try {
      const body = request.body;
      const {id} = request.params;
      const user = await userService.sendEmail(body)
      response.json(user)
    } catch (error) {
      next(error);
    }
  }
)

router.post('/verifyCode',
  async (request, response, next) => {
    try {
      const body = request.body;
      const {id} = request.params;
      const user = await userService.verifyCode(body)
      response.json(user)
    } catch (error) {
      next(error);
    }
  }
)

router.post('/changePassword',
  async (request, response, next) => {
    try {
      const body = request.body;
      const {id} = request.params;
      const user = await userService.changePass(body)
      response.json(user)
    } catch (error) {
      next(error);
    }
  }
)

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (request, response, next) => {
    try {
      const {id} = request.params;
      const user = await userService.getOne(id)
      response.json(user)
    } catch (error) {
      next(error);
    }
  }
)


router.post('/',
validateEmail,
validatorHandler(createUserSchema, 'body') ,
  async (request, response, next) => {
    try {
      const body = request.body;
      res = await userService.create(body)
      response.status(201).json({status:'ok',data:res})
    } catch (error) {
      next(error);
    }
})

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const {id} = request.params;
    res = await userService.update(id, body)

    response.json({status:'ok',data:res, id})
  }
)

router.delete('/:id', (request, response) => {
  const body = request.body;
  const {id} = request.params;
  response.json({status:'delete',data:body, id})
})

router.get('new-route/:id', (request, response) => {
  const {id} = request.params;
  response.json({status:'ok', data:id})
})

router.get('other-route-queryparams', (request, response) => {
  const {page} = request.query;
  response.json({status:'ok', page})
})


module.exports = router;
