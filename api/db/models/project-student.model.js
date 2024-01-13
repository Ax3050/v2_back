const { Model, DataTypes, Sequelize } = require('sequelize');
const { INVESTIGATOR_TABLE } = require('./investigator.model');
const { PROJECT_TABLE } = require('./project.model');

const PROJECT_STUDENT_TABLE = 'project-student';


const ProjectStudentSchema ={
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  status: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  investigatorId: {
    field: 'investigator_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: INVESTIGATOR_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  projectId: {
    field: 'project_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: PROJECT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class ProjectStudent extends Model {
  static associate(models){
    // this.hasMany(models.Investigator,{
    //   as:'investigator',
    //   foreignKey:'id'
    // })
    this.belongsTo(models.Investigator, {as: 'investigator'});
    this.belongsTo(models.Project, {as: 'project'});
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: PROJECT_STUDENT_TABLE,
      modelName: 'ProjectStudent',
      timestamps: false
    }
  }
}


module.exports = { PROJECT_STUDENT_TABLE,  ProjectStudentSchema, ProjectStudent}
