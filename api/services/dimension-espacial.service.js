const { Op } = require('sequelize');
const { Municipio } = require('../db/models/municipio.model');
const { Parroquia } = require('../db/models/parroquia.model');
const sequelize = require('../libs/sequelize');
const {models} = require('../libs/sequelize');

class DimensionEspacialService {

  async get(){
    const {count, rows} = await models.DimensionEspacial.findAndCountAll({
      order:[
        ['created_at', 'DESC']
      ],
      include: [{
        model:Parroquia, as:'parroquia',
        include:[{
          model:Municipio, as:'municipio',
          include:['estado']
        }]
      }],

    })
    return {total:count, data:rows}
  }

  async search(search){
    const {count, rows} = await models.DimensionEspacial.findAndCountAll({
      order:[
        ['created_at', 'DESC']
      ],
      include: [{
        model:Parroquia, as:'parroquia',
        include:[{
          model:Municipio, as:'municipio',
          include:['estado']
        }]
      }],
      where:{
        name: {
          [Op.like]: `%${search?.search}%`,
        },
        '$parroquia.municipio.estado.id$': search?.estado_id ? search?.estado_id : { [Op.ne]: null },
        '$parroquia.municipio.id$': search?.municipio_id ? search?.municipio_id : { [Op.ne]: null },
        '$parroquia.id$': search?.parroquia_id ? search?.parroquia_id : { [Op.ne]: null },
      }
    })
    return {total:count, data:rows}
  }

  async getByParroquiaId(id){
    const {count, rows} = await models.DimensionEspacial.findAndCountAll({
      order:[
        ['created_at', 'DESC']
      ],
      where:{
        parroquiaId:id
      }

    })
    return {total:count, data:rows}
  }


  async create(data){
    const find = await sequelize.query(`
    select *,
    LEVENSHTEIN(name, '${data.name}') as levenshtein from area_prioritaria where LEVENSHTEIN(name, '${data.name}') < 4
    `)

    if(find[0].length > 0){
      throw new Error(`Al parecer ${data.name} ya está registrado`)
    }

    const res = await models.DimensionEspacial.create(data)
    return res;
  }

  async update(id, data) {
    try {
      const res = await models.DimensionEspacial.findByPk(id);
      await res.update(data);
      return res;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id){
    const model = await models.DimensionEspacial.findByPk(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = DimensionEspacialService;
