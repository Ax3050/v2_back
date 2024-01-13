const { Op } = require('sequelize');
const sequelize = require('../libs/sequelize');
const {models} = require('../libs/sequelize');

class EstadoService {

  async get(){
    const {count, rows} = await models.Estado.findAndCountAll({
      order:[
        ['created_at', 'DESC']
      ]
    })
    return {total:count, data:rows}
  }

  async create(data){
    const find = await sequelize.query(`
    select *,
    LEVENSHTEIN(name, '${data.name}') as levenshtein from estado where LEVENSHTEIN(name, '${data.name}') < 2
    `)

    if(find[0].length > 0){
      throw new Error(`Al parecer ${data.name} ya está registrado`)
    }

    const res = await models.Estado.create(data)
    return res;
  }

  async search(search){
    const {count, rows} = await models.Estado.findAndCountAll({
      order:[
        ['created_at', 'DESC']
      ],
      where:{
        name: {
          [Op.like]: `%${search?.search}%`,
        },
      }
    })
    return {total:count, data:rows}
  }

  async create(data){
    const find = await sequelize.query(`
    select *,
    LEVENSHTEIN(name, '${data.name}') as levenshtein from estado where LEVENSHTEIN(name, '${data.name}') < 2
    `)

    if(find[0].length > 0){
      throw new Error(`Al parecer ${data.name} ya está registrado`)
    }

    const res = await models.Estado.create(data)
    return res;
  }

  async update(id, data) {
    try {
      const res = await models.Estado.findByPk(id);
      await res.update(data);
      return res;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id){
    const model = await models.Estado.findByPk(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = EstadoService;
