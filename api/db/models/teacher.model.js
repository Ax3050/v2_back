const { Model, DataTypes, Sequelize } = require('sequelize')
const { PEOPLE_TABLE } = require('./people.model')
const TEACHER_TABLE = 'teacher';
const { TRAYECTO_TABLE } = require('./trayecto.model')
const { SECCION_TABLE } = require('./seccion.model')
const { PNF_TABLE } = require('./pnf.model')

const TeacherSchema ={
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
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
  peopleId: {
    field: 'people_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PEOPLE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
}

class Teacher extends Model {
  static associate(models){
    this.belongsTo(models.People, {as: 'people'});
    this.belongsTo(models.Pnf, {as: 'pnf'});
    this.belongsTo(models.Seccion, {as: 'seccion'});
    this.belongsTo(models.Trayecto, {as: 'trayecto'});
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: TEACHER_TABLE,
      modelName: 'Teacher',
      timestamps: false
    }
  }
}

module.exports = { TEACHER_TABLE,  TeacherSchema, Teacher}
