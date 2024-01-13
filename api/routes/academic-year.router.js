const express = require('express');
const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler');
const { createAcademicYearSchema, updateAcademicYearSchema, getAcademicYearSchema, validateAcademicYear } = require('./../schemas/academic-year.schema')
const AcademicYearService = require('./../services/academic-year.service')
const academicYearService = new AcademicYearService;




router.get('/', async (request, response, next) => {
  try {
    const users = await academicYearService.get()
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/',
  validatorHandler(createAcademicYearSchema, 'body'),
  validateAcademicYear,
  async (request, response, next) => {
  try {
    const body = request.body;
    res = await academicYearService.createAcademicYear(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.patch('/:id',
  validatorHandler(getAcademicYearSchema, 'params'),
  validatorHandler(updateAcademicYearSchema, 'body'),
  validateAcademicYear,
  async (request, response) => {
    const body = request.body;
    const {id} = request.params;
    res = await academicYearService.update(id, body)
    response.status(200).json({status:'ok',data:res})
  }
)

router.delete('/:id',
  validatorHandler(getAcademicYearSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await academicYearService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
