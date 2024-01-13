const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class TeacherService {

  async findTeacher(data) {
    try {
      const teacher = await models.People.findOne({
        where: { cedula: data },
        include: [
          {
            association: 'teacher',
            include: [
              'pnf',
              'trayecto',
              'seccion'
            ]
          },
          'user',
          {
            association: 'investigator',
            include: [
              'pnf',
              'trayecto',
              'seccion'
            ]
          }
        ]
      });
      if (!teacher) {
        return { type: 1, data: null }
      }

      if (teacher.investigator) {
        return { type: 3, data: teacher }
      } else {
        return { type: 2, data: teacher }
      }

    } catch (error) {
      console.error(error)
    }
  }

  async get() {

    const data = await models.Teacher.findAll({
      attributes: ['people_id'],
      group: [
        'Teacher.people_id',
      ],

    })

    const res = await models.People.findAll({
      where: {
        id: data.map(e => e.dataValues.people_id)
      },
      include: [
        {
          association: 'teacher',
          include: [
            'pnf',
            'trayecto',
            'seccion',

          ]
        },
        {
          association: 'user',
          attributes: ['id']
        }
      ]
    })


    return { data: res }
  }

  async search(search) {

    const data = await models.Teacher.findAll({
      attributes: ['people_id'],
      group: [
        'Teacher.people_id',
      ],

    })

    const res = await models.People.findAll({
      where: {
        id: data.map(e => e.dataValues.people_id),
        [Op.or]: [
          {
            cedula: {
              [Op.like]: `%${search?.search}%`,
            },
          },
          {
            name: {
              [Op.like]: `%${search?.search}%`,
            },
          },
        ],
      },
      include: [
        {
          association: 'teacher',
          include: [
            'pnf',
            'trayecto',
            'seccion',

          ]
        },
        {
          association: 'user',
          attributes: ['id']
        }
      ]
    })


    return { data: res }
  }

  async getProjectByTeacher(id) {
    const teacher = await models.Teacher.findAll({
      where: {
        people_id: id
      },
      attributes: ['seccionId'],
      group: [
        'seccionId'
      ]
    })

    const projects = await models.Project.findAll({
      order: [
        ['created_at', 'DESC']
      ],
      include: [
        {
          association: 'projectStudent',
          include: [
            {
              association: 'investigator',
              include: [
                'people'
              ]
            }

          ]
        },
        'pnf',
        'trayecto',
        {
          association: 'DimensionEspacial',
          include: [
            {
              association: 'parroquia',
              include: [
                {
                  association: 'municipio',
                  include: ['estado']
                }
              ]
            }
          ]
        },
        'AreaPrioritaria',
        'AreaPrioritaria',
        'AcademicYear',
        'LineaInvestigacion',
        'seccion',

      ],
      where: {
        seccionId: {
          [Op.in]: teacher.map(obj => obj.seccionId)
        }
      }
    })
    return projects
  }

  async create(data) {
    const dataFill = data.filter(e => e.id == null)
    const res = await models.Teacher.bulkCreate(dataFill)
    return res;
  }

  async store(data) {

    res = await models.Teacher.create(data)
    return res;
  }

  async update(id, data) {
    try {
      const inv = await models.Teacher.findByPk(id, { include: ['people'] });
      await inv.people.update(data?.people);
      await inv.update(data);
      return inv;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(data) {
    console.log('DATA DELETE', data)
    data.map(async (e) => {
      const model = await models.Teacher.findByPk(e?.id);
      await model.destroy();
    })
    return { rta: true };
  }

}

module.exports = TeacherService;
