const express = require('express');
const validatorHandler = require('../middlewares/validator.handler')
const router = express.Router();

const fs = require('fs')
const csv = require('fast-csv');
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: 'tmp/csv/' });
const ImportService = require('./../services/bulk-import.service')
const bulkService = new ImportService;
const PnfService = require('./../services/pnf.services')
const pnfService = new PnfService;
const TrayectoService = require('./../services/trayecto.service')
const trayectoService = new TrayectoService;
const SeccionService = require('./../services/seccion.service')
const seccionService = new SeccionService;


const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './uploads/')
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    )
  },
})

router.post('/',  upload.single('file'), async (req, response, next) => {
  console.log('dir file ', req.file.path)
  let fileRows = [];
  csv.parseFile(req.file.path)
    .on("data",  (data)=> {
      const row = data[0].replaceAll(';',',').split(',')
      // fileRows.push(); // push each row
      console.log('columna,', row)
      fileRows.push(row);
    })
    .on("end", async() => {
      fileRows.shift()

      fileRows.map((rows,index)=> rows.map(e=> e == '' && response.status(400).json({status:'error',message:`tienes campos vacíos en la fila ${index+2}`})))
      fileRows.map((rows,index)=>
        rows[4].length < 8  &&
        response.status(400).json({status:'error',message:`la cedula colocada en la fila ${index+2} no es correcta, verifique su longitud y que sean solo números.`})
      )
      // if(  row[5].length < 7) { response.status(400).json({status:'error',message:`la cedula ${row[5]} no cumple con el minimo de caracteres requeridos`})}
      fs.unlinkSync(req.file.path);

      try {

        res =await fileRows.map( async (e)=>{
          const pnfId = await pnfService.getIdByCode(e[5])
          const trayectoId = await trayectoService.getIdByName(e[6])
          const seccionId = await seccionService.getIdByName(e[7]);

          await bulkService.create([{
            exp: `${e[0]}`,
            pnfId:pnfId,
            trayectoId:trayectoId,
            seccionId:seccionId,
            people:{
              name: e[1],
              lastname: e[2],
              nationality: e[3] == 'V'? 1 : 2,
              cedula: e[4]
            }
          }])
        })
        response.status(201).json({status:'ok',data:res})
      } catch (error) {
        next(error);
      }

         // remove temp file

      //process "fileRows" and respond
    })

  // csvToDb(__dirname + '/uploads/' + req.file.filename)
  // try {
  //   const body = request.body;
  //   res = await estadoService.create(body)
  //   response.status(201).json({status:'ok',data:res})
  // } catch (error) {
  //   next(error);
  // }
})

router.post('/teacher',  upload.single('file'), async (req, response, next) => {
  console.log('dir file ', req.file.path)
  let fileRows = [];
  csv.parseFile(req.file.path)
    .on("data",  (data)=> {
      const row = data[0].replaceAll(';',',').split(',')
      // fileRows.push(); // push each row
      console.log('columna,', row)
      fileRows.push(row);
    })
    .on("end", async() => {
      fileRows.shift()

      fileRows.map((rows,index)=> rows.map(e=> e == '' && response.status(400).json({status:'error',message:`tienes campos vacíos en la fila ${index+2}`})))
      fileRows.map((rows,index)=>
        rows[4].length < 8  &&
        response.status(400).json({status:'error',message:`la cedula colocada en la fila ${index+2} no es correcta, verifique su longitud y que sean solo números.`})
      )
      // if(  row[5].length < 7) { response.status(400).json({status:'error',message:`la cedula ${row[5]} no cumple con el minimo de caracteres requeridos`})}
      fs.unlinkSync(req.file.path);

      try {

        res =await fileRows.map( async (e)=>{
          const pnfId = await pnfService.getIdByCode(e[5])
          const trayectoId = await trayectoService.getIdByName(e[6])
          const seccionId = await seccionService.getIdByName(e[7]);

          await bulkService.create([{
            exp: `${e[0]}`,
            pnfId:pnfId,
            trayectoId:trayectoId,
            seccionId:seccionId,
            people:{
              name: e[1],
              lastname: e[2],
              nationality: e[3] == 'V'? 1 : 2,
              cedula: e[4]
            }
          }])
        })
        response.status(201).json({status:'ok',data:res})
      } catch (error) {
        next(error);
      }

         // remove temp file

      //process "fileRows" and respond
    })

  // csvToDb(__dirname + '/uploads/' + req.file.filename)
  // try {
  //   const body = request.body;
  //   res = await estadoService.create(body)
  //   response.status(201).json({status:'ok',data:res})
  // } catch (error) {
  //   next(error);
  // }
})

module.exports = router;
