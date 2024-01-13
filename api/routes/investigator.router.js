const express = require('express');

const validatorHandler = require('../middlewares/validator.handler')
const { createInvestigatorSchema, getInvestigatorSchema, updateInvestigatorSchema, validateExp } = require('./../schemas/investigator.schema')
const InvestigatorService = require('./../services/investigator.service');
const { validateCedula } = require('../schemas/people.schema');
const { validateEmail } = require('../schemas/user.schema');

const router = express.Router();
const investigatorService = new InvestigatorService;



router.get('/', async (request, response, next) => {
  try {
    const users = await investigatorService.get()
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.get('/getByPeopleId/:id', async (req, response, next) => {
  try {
    const { id } = req.params;

    const users = await investigatorService.getStudentByPeopleId(id)
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/search', async (req, response, next) => {
  try {
    const body = req.body;
    const users = await investigatorService.searchStudent(body)
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/search-inv', async (req, response, next) => {
  try {
    const body = req.body;
    const users = await investigatorService.searchInvestigator(body)
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/listProject', async (req, response, next) => {
  try {
    const body = req.body;
    const users = await investigatorService.listStudentProject(body)
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/',
  validatorHandler(createInvestigatorSchema, 'body'),
  validateCedula,
  validateExp,
  async (request, response, next) => {
  try {
    const body = request.body;
    res = await investigatorService.create(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.post('/list',
  // validatorHandler(createInvestigatorSchema, 'body'),
  // validateCedula,
  // validateExp,
  async (request, response, next) => {
  try {
    const body = request.body;
    res = await investigatorService.getList(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.post('/listForTeacher',
  // validatorHandler(createInvestigatorSchema, 'body'),
  // validateCedula,
  // validateExp,
  async (request, response, next) => {
  try {
    const body = request.body;
    res = await investigatorService.getListForTeacher(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})


router.post('/register',
validateEmail,
async (request, response, next) => {
  try {
    const body = request.body;
    res = await investigatorService.register(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.patch('/:id',
  validatorHandler(getInvestigatorSchema, 'params'),
  validatorHandler(updateInvestigatorSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const {id} = request.params;
    res = await investigatorService.update(id, body)
    response.status(200).json({status:'ok',data:res})
  }
)

router.delete('/:id',
  validatorHandler(getInvestigatorSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await investigatorService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
