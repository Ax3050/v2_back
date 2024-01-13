const express = require('express');

const validatorHandler = require('../middlewares/validator.handler')
const { createTeacherSchema, getTeacherSchema} = require('./../schemas/teacher.schema')
const TeacherService = require('./../services/teacher.service')

const router = express.Router();
const teacherService = new TeacherService;

router.get('/find/:cedula', async (request, response, next) => {
  const { cedula } = request.params;
  try {
    const {page} = request.query;
    const users = await teacherService.findTeacher(cedula)
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/search', async (request, response, next) => {
  const body = request.body;

  try {
    const {page} = request.query;
    const users = await teacherService.search(body)
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.get('/get-projects/:id', async (request, response, next) => {
  try {
    const { id } = request.params;

    const projects = await teacherService.getProjectByTeacher(id)
    response.json(projects)
  } catch (error) {
    next(error);
  }
})

router.get('/', async (request, response, next) => {
  try {
    const {page} = request.query;
    const users = await teacherService.get(page)
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/', validatorHandler(createTeacherSchema, 'body') ,async (request, response, next) => {
  try {
    const body = request.body;
    res = await teacherService.create(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.post('/delete',
  async (req, res, next) => {
    try {
      const body = req.body;
      await teacherService.delete(body);
      res.status(201).json(true);
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
