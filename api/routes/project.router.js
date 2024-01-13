const express = require('express');
const validatorHandler = require('../middlewares/validator.handler')
const ProjectService = require('./../services/project.service')

const router = express.Router();
const projectService = new ProjectService;



router.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;

    const projects = await projectService.get(id)
    response.json(projects)
  } catch (error) {
    next(error);
  }
})

router.post('/', async (request, response, next) => {
  try {
    const body = request.body;
    res = await projectService.create(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.patch('/change-status-investigator/:id', async (request, response, next) => {
  try {
    const body = request.body;
    const {id} = request.params;
    res = await projectService.updateStatusInvestigator(id,body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.patch('/change-status/:id',
  async (request, response) => {
    const body = request.body;
    const {id} = request.params;
    res = await projectService.changeStatus(id, body)
    response.status(200).json({status:'ok',data:res})
  }
)

router.patch('/update/:id',
  async (request, response) => {
    const body = request.body;
    const {id} = request.params;
    res = await projectService.update(id, body)
    response.status(200).json({status:'ok',data:res})
  }
)


router.patch('/update-inv/:id',
  async (request, response) => {
    const body = request.body;
    const {id} = request.params;
    res = await projectService.updateStatusInvestigator(id, body)
    response.status(200).json({status:'ok',data:res})
  }
)

module.exports = router;
