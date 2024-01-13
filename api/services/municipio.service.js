const { Op } = require('sequelize');
const sequelize = require('../libs/sequelize');
const {models} = require('../libs/sequelize');

class MunicipioService {

  async get(){
    const {count, rows} = await models.Municipio.findAndCountAll({
      include: ['estado'],
      order:[
        ['created_at', 'DESC']
      ]
    })
    return {total:count, data:rows}
  }

  async getByState(id){
    const {count, rows} = await models.Municipio.findAndCountAll({
      where:{estado_id:id},
      order:[
        ['name', 'ASC']
      ]
    })
    return {total:count, data:rows}
  }

  async search(search){
    const {count, rows} = await models.Municipio.findAndCountAll({
      include: ['estado'],
      order:[
        ['created_at', 'DESC']
      ],
      where:{
        name: {
          [Op.like]: `%${search?.search}%`,
        },
        '$estado.id$': search?.estado_id ? search?.estado_id : { [Op.ne]: null },

      }
    })
    return {total:count, data:rows}
  }

  async getByState(id){
    const {count, rows} = await models.Municipio.findAndCountAll({
      where:{estado_id:id},
      order:[
        ['name', 'ASC']
      ]
    })
    return {total:count, data:rows}
  }

  async create(data){
    const find = await sequelize.query(`
    select *,
    LEVENSHTEIN(name, '${data.name}') as levenshtein from municipio where LEVENSHTEIN(name, '${data.name}') < 2 and estado_id = ${data.estadoId}
    `)
    if(find[0].length > 0){
      throw new Error(`Al parecer ${data.name} ya está registrado`)
    }
    const res = await models.Municipio.create(data)
    return res;
  }

  async update(id, data) {
    try {
      const res = await models.Municipio.findByPk(id);
      await res.update(data);
      return res;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id){
    const model = await models.Municipio.findByPk(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = MunicipioService;
