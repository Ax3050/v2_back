const { Model, DataTypes, Sequelize } = require('sequelize')
const { PEOPLE_TABLE } = require('./people.model')
const { TRAYECTO_TABLE } = require('./trayecto.model')
const { SECCION_TABLE } = require('./seccion.model')
const { PNF_TABLE } = require('./pnf.model')
const { ACADEMIC_YEAR_TABLE } = require('./academic-year.model')
const INVESTIGATOR_TABLE = 'investigator';


const InvestigatorSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  exp: {
    allowNull: true,
    type: DataTypes.STRING
  },
  trayectoId: {
    field: 'trayecto_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: TRAYECTO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
  },
  seccionId: {
    field: 'seccion_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: SECCION_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
  },
  pnfId: {
    field: 'pnf_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PNF_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
  },
  academicYearId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: ACADEMIC_YEAR_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  pnfId: {
    field: 'pnf_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PNF_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
  },
  peopleId: {
    field: 'people_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: PEOPLE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
}

class Investigator extends Model {
  static associate(models) {
    this.belongsTo(models.People, { as: 'people' });
    this.belongsTo(models.Pnf, { as: 'pnf' });
    this.belongsTo(models.Seccion, { as: 'seccion' });
    this.belongsTo(models.Trayecto, { as: 'trayecto' });
    this.belongsTo(models.AcademicYear, { as: 'academicYear' });
      this.hasMany(models.ProjectStudent,{
      as:'projectStudents',
      foreignKey:'investigator_id'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INVESTIGATOR_TABLE,
      modelName: 'Investigator',
      timestamps: false
    }
  }
}

module.exports = { INVESTIGATOR_TABLE, InvestigatorSchema, Investigator }
