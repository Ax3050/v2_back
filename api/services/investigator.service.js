const { where } = require('sequelize');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');


class InvestigatorService {

  async get() {
    // const [data] = await sequelize.query('select * from users')
    const { count, rows } = await models.Investigator.findAndCountAll({
      include: ['people', 'pnf', 'seccion', 'trayecto',
      {
        association:'people',
        include:[
          {
            association:'user',
            attributes:['id']
          }
        ]
      }
    ],
      order: [
        ['created_at', 'DESC']
      ]
    })
    return { total: count, data: rows }
  }

  async getStudentByPeopleId(id) {
    // const [data] = await sequelize.query('select * from users')
    const data = await models.People.findOne({
      include: ['investigator'],
      where: { 'id': id }
    })
    return data
  }

  async searchStudent(data) {
    // const [data] = await sequelize.query('select * from users')
    const { count, rows } = await models.Investigator.findAndCountAll({
      include: ['people', 'pnf', 'seccion', 'trayecto',
      {
        association:'people',
        include:[
          {
            association:'user',
            attributes:['id']
          }
        ]
      }
    ],
      order: [
        ['created_at', 'DESC']
      ],
      where: {
        pnf_id: data?.pnfId,
        trayecto_id: data?.trayectoId,
        seccion_id: data?.seccionId,
        [Op.or]: [
          {
            '$people.cedula$': {
              [Op.like]: `%${data?.search}%`,
            },
          },
          {
            exp: {
              [Op.like]: `%${data?.search}%`,
            },
          },
        ],
      },
    })
    return { total: count, data: rows }
  }

  async searchInvestigator(data){
    const { count, rows } = await models.Investigator.findAndCountAll({
      include: ['people', 'pnf', 'seccion', 'trayecto',
      {
        association:'people',
        include:[
          {
            association:'user',
            attributes:['id']
          }
        ]
      }
    ],
      order: [
        ['created_at', 'DESC']
      ],
      where: {
        [Op.or]: [
          {
            '$people.cedula$': {
              [Op.like]: `%${data?.search}%`,
            },
          },
          {
            exp: {
              [Op.like]: `%${data?.search}%`,
            },
          },
        ],
      },
    })
    return { total: count, data: rows }
  }

  async listStudentProject(data) {
    // const [data] = await sequelize.query('select * from users')
    const { count, rows } = await models.Investigator.findAndCountAll({
      include: [
        'people', 'pnf', 'seccion', 'trayecto',
        {
          model:models.ProjectStudent,
          as:'projectStudents',
          include: {
            model: models.Project,
            as: 'project',
            where: {
              status: {
                [Op.in]: [0, 1]
              }
            }
          }
        }
      ],
      order: [
        ['created_at', 'DESC']
      ],
      where: {
        pnf_id: data?.pnfId,
        trayecto_id: data?.trayectoId,
        seccion_id: data?.seccionId,
      },
    })
    return { total: count, data: rows }
  }

  async getList(data) {
    // const [data] = await sequelize.query('select * from users')
    const { count, rows } = await models.Investigator.findAndCountAll({
      include: ['people', 'pnf', 'seccion', 'trayecto'],
      order: [
        ['created_at', 'DESC']
      ],
      where: [
        { pnf_id: data?.pnfId },
        { trayecto_id: data?.trayectoId },
        { seccion_id: data?.seccionId },
      ]
    })
    return { total: count, data: rows }
  }

  async getListForTeacher(data) {
    // const [data] = await sequelize.query('select * from users')
    const { count, rows } = await models.Investigator.findAndCountAll({
      include: [
        'people', 'pnf', 'seccion', 'trayecto',
        {
          model:models.ProjectStudent,
          as:'projectStudents',
          include: {
            model: models.Project,
            as: 'project',
            where: {
              status: {
                [Op.in]: [0, 1]
              }
            }
          }
        }
      ],
      order: [
        ['created_at', 'DESC']
      ],
      where: {
        pnf_id: data?.pnfId,
        trayecto_id: data?.trayectoId,
        seccion_id: data?.seccionId,
        id: {
          [Op.notIn]: data?.projectStudent.map(({ investigatorId }) => investigatorId)
        }
      },
    })
    return { total: count, data: rows }
  }

  async create(data) {
    try {

      const res = await models.Investigator.create(data, {
        include: ['people']
      })

      return res;
    } catch (error) {
      throw new Error(error)

    }
  }

  async register(data) {
    // const res = await models.Investigator.create(data)
    // data.user.peopleId = res.peopleId;
    const hash = await bcrypt.hash(data.user.password, 10);
    const user = await models.User.create({
      ...data.user,
      password: hash
    },)
    return user;
  }


  async update(id, data) {
    try {
      const inv = await models.Investigator.findByPk(id, { include: ['people'] });
      await inv.people.update(data?.people);
      await inv.update(data);
      return inv;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id) {
    const model = await models.Investigator.findByPk(id);
    await model.destroy({
      include: ['people']
    });
    return { rta: true };
  }

}

module.exports = InvestigatorService;
