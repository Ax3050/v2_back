const { Op } = require('sequelize');
const sequelize = require('../libs/sequelize');
const {models} = require('../libs/sequelize');

class SeccionService {

  async get(){
    const {count, rows} = await models.Seccion.findAndCountAll({
      include: ['pnf','trayecto','academicYear'],
      order:[
        ['created_at', 'DESC']
      ]
    })
    return {total:count, data:rows}
    console.log(data)
  }

  async search(search){
    const {count, rows} = await models.Seccion.findAndCountAll({
      include: ['pnf','trayecto','academicYear'],
      where:{
        name: {
          [Op.like]: `%${search?.search}%`,
        },
        pnf_id: search?.pnf ? search?.pnf : { [Op.ne]: null }
      },
      order:[
        ['created_at', 'DESC']
      ]
    })
    return {total:count, data:rows}
  }

  async getByPnf(id, trayectoId){
    const {count, rows} = await models.Seccion.findAndCountAll({
      where:{pnf_id:id, trayecto_id:trayectoId},
      order:[
        ['name', 'ASC']
      ]
    })
    return {total:count, data:rows}
  }

  async getIdByName(data){
    const {dataValues} = await models.Seccion.findOne({
      where:{name:data},
    })
    return dataValues.id;
  }

  /*async create(data){
    console.log('data ', data)
    const find = await sequelize.query(`
    select *,
    LEVENSHTEIN(name, '${data.name}') as levenshtein from seccion where LEVENSHTEIN(name, '${data.name}') < 1 and pnf_id = ${data.pnfId}
    `)
    if(find[0].length > 0){
      throw new Error(`Al parecer ${data.name} ya está registrado`)
    }
    const res = await models.Seccion.create(data)
    return res;
  }*/

 async create(data) {
    console.log('data', data);
  
    // Buscar secciones existentes con el mismo nombre y año académico
    const existingSection = await models.Seccion.findOne({
      where: {
        name: data.name,
        academicYearId: data.academicYearId
      }
    });
  
    if (existingSection) {
      throw new Error(`Al parecer ${data.name} ya existe en este año académico`);
    }
  
    // Resto del código para buscar secciones similares y crear la sección...
  
    // Crear una nueva sección en la base de datos
    const res = await models.Seccion.create(data);
  
    return res;
  }

  async update(id, data) {
    try {
      const res = await models.Seccion.findByPk(id);
      await res.update(data);
      return res;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id){
    const model = await models.Seccion.findByPk(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = SeccionService;
