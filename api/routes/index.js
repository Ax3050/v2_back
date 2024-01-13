const express = require('express');
const userRouter = require('./users.router')
const peopleRouter = require('./people.router')
const investigatorRouter = require('./investigator.router')
const pnfRouter = require('./pnf.router')
const trayectoRouter = require('./trayecto.router')
const seccionRouter = require('./seccion.router')
const estadoRouter = require('./estado.router')
const municipioRouter = require('./municipio.router')
const parroquiaRouter = require('./parroquia.router')
const authRouter = require('./auth.router')
const bulkImportRouter = require('./bulk-import.router')
const teacherRouter = require('./teacher.router')
const areaPrioritariaRouter = require('./area-prioritaria.router')
const lineaInvestigacionRouter = require('./linea-investigacion.router')
const dimensionEspacialRouter = require('./dimension-espacial.router')
const sujetoSocialRouter = require('./sujeto-social.router')
const academicYearRouter = require('./academic-year.router')
const projectRouter = require('./project.router')

function routerApp(app){
  const router = express.Router();
  app.use('/api', router)
  router.use('/user', userRouter)
  router.use('/people', peopleRouter)
  router.use('/investigator', investigatorRouter)
  router.use('/pnf', pnfRouter)
  router.use('/trayecto', trayectoRouter)
  router.use('/seccion', seccionRouter)
  router.use('/estado', estadoRouter)
  router.use('/municipio', municipioRouter)
  router.use('/parroquia', parroquiaRouter)
  router.use('/auth', authRouter)
  router.use('/import_excel', bulkImportRouter)
  router.use('/teacher', teacherRouter)
  router.use('/area-prioritaria', areaPrioritariaRouter)
  router.use('/linea-investigacion', lineaInvestigacionRouter)
  router.use('/dimension-espacial', dimensionEspacialRouter)
  router.use('/sujeto-social', sujetoSocialRouter)
  router.use('/academic-year', academicYearRouter)
  router.use('/project', projectRouter)

}


module.exports = routerApp
