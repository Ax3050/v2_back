const { Op } = require('sequelize');
const { Estado } = require('../db/models/estado.model');
const { Municipio } = require('../db/models/municipio.model');
const sequelize = require('../libs/sequelize');
const {models} = require('../libs/sequelize');

class ParroquiaService {

  async get(){
    const {count, rows} = await models.Parroquia.findAndCountAll({
      include: [{model:Municipio, as:'municipio', include:['estado']}],
      order:[
        ['created_at', 'DESC']
      ]
    })
    return {total:count, data:rows}
  }

  async search(search){
    const {count, rows} = await models.Parroquia.findAndCountAll({
      include: [{model:Municipio, as:'municipio', include:['estado']}],
      order:[
        ['created_at', 'DESC']
      ],
      where:{
        name: {
          [Op.like]: `%${search?.search}%`,
        },
        '$municipio.estado.id$': search?.estado_id ? search?.estado_id : { [Op.ne]: null },
        '$municipio.id$': search?.municipio_id ? search?.municipio_id : { [Op.ne]: null },
      }
    })
    return {total:count, data:rows}
  }

  async getByState(id){
    const {count, rows} = await models.Parroquia.findAndCountAll({
      where:{municipio_id:id},
      order:[
        ['name', 'ASC']
      ]
    })
    return {total:count, data:rows}
  }

  async create(data){
    const find = await sequelize.query(`
    select *,
    LEVENSHTEIN(name, '${data.name}') as levenshtein from parroquia where LEVENSHTEIN(name, '${data.name}') < 2 and municipio_id = ${data.municipioId}
    `)
    if(find[0].length > 0){
      throw new Error(`Al parecer ${data.name} ya está registrado`)
    }
    const res = await models.Parroquia.create(data)
    return res;
  }

  async update(id, data) {
    try {
      const res = await models.Parroquia.findByPk(id);
      await res.update(data);
      return res;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id){
    const model = await models.Parroquia.findByPk(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = ParroquiaService;
