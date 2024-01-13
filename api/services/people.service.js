const {models} = require('../libs/sequelize');


class PeopleService {

  async get(page = 0){
    // const [data] = await sequelize.query('select * from users')
    page > 0 && (page = page-1);
    const data = await models.People.findAll({
      limit:5,
      offset:page*5
    })
    return {data, page}
  }

  async update(id, data) {
    try {
      const inv = await models.People.findByPk(id);
      await inv.update(data);
      return inv;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id){
    const model = await models.People.findByPk(id);
    await model.destroy();
    return { rta: true };
  }


  async create(data){
      const res = await models.People.create(data)
      return res;

  }

}

module.exports = PeopleService;
