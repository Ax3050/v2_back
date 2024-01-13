const sequelize = require('../libs/sequelize');
const {models} = require('../libs/sequelize');

class AcademicYear {

  async get(){
    const {count, rows} = await models.AcademicYear.findAndCountAll({
      order:[
        ['created_at', 'DESC']
      ]
    })
    return {total:count, data:rows}
  }

  async createAcademicYear(year) {
    try {
      const academicYear = await models.AcademicYear.create(year);
      return academicYear;
    } catch (error) {
      throw new Error('Error creating academic year');
    }
  }

  async getAcademicYearById(id) {
    try {
      const academicYear = await models.AcademicYear.findByPk(id);
      return academicYear;
    } catch (error) {
      throw new Error('Error fetching academic year');
    }
  }

  async update(id, data) {
    try {
      const res = await models.AcademicYear.findByPk(id);
      await res.update(data);
      return res;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id){
    const model = await models.AcademicYear.findByPk(id);
    await model.destroy();
    return { rta: true };
  }
}



// otros métodos del servicio
module.exports = AcademicYear;
