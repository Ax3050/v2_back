const sequelize = require('../libs/sequelize');
const {models} = require('../libs/sequelize');

class SujetoSocialService {

  async get(){
    const {count, rows} = await models.SujetoSocial.findAndCountAll({
      include: ['DimensionEspacial'],
      order:[
        ['created_at', 'DESC']
      ]
    })
    return {total:count, data:rows}
  }

  async find(id){
    const {count, rows} = await models.SujetoSocial.findAndCountAll({
      where:{dimension_espacial_id:id},
      order:[
        ['created_at', 'DESC']
      ]
    })
    return {total:count, data:rows}
  }


  async create(data){
    const find = await sequelize.query(`
    select *,
    LEVENSHTEIN(name, '${data.name}') as levenshtein from sujeto_social where LEVENSHTEIN(name, '${data.name}') < 2 and dimension_espacial_id = ${data.DimensionEspacialId}
    `)
    if(find[0].length > 0){
      throw new Error(`Al parecer ${data.name} ya está registrado`)
    }
    const res = await models.SujetoSocial.create(data)
    return res;
  }

  async update(id, data) {
    try {
      const res = await models.SujetoSocial.findByPk(id);
      await res.update(data);
      return res;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id){
    const model = await models.SujetoSocial.findByPk(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = SujetoSocialService;
