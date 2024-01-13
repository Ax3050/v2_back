const sequelize = require('../libs/sequelize');
const {models} = require('../libs/sequelize');

class TrayectoService {

  async get(){
    const {count, rows} = await models.Trayecto.findAndCountAll({
      order:[
        ['created_at', 'DESC']
      ]
    })
    return {total:count, data:rows}
  }

  async getByPnf(id){
    const {count, rows} = await models.Seccion.findAndCountAll({
      where:{pnf_id:id},
      order:[
        ['name', 'ASC']
      ]
    })
    return {total:count, data:rows}
  }

  async getIdByName(data){
    const {dataValues} = await models.Trayecto.findOne({
      where:{name:data},
    })
    return dataValues.id;
  }

  async create(data){
    const find = await sequelize.query(`
      select *,
      LEVENSHTEIN(name, '${data.name}') as levenshtein from trayecto where LEVENSHTEIN(name, '${data.name}') < 1
      `)

    if(find[0].length > 0){
      throw new Error(`Al parecer ${data.name} ya está registrado`)
    }

    const res = await models.Trayecto.create(data)
    return res;
  }

  async update(id, data) {
    try {
      const res = await models.Trayecto.findByPk(id);
      await res.update(data);
      return res;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id){
    const model = await models.Trayecto.findByPk(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = TrayectoService;
