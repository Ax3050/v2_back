const { Model, DataTypes, Sequelize } = require('sequelize')
const { PNF_TABLE } = require('./pnf.model')
const { TRAYECTO_TABLE } = require('./trayecto.model')
const { SECCION_TABLE } = require('./seccion.model')
const { ACADEMIC_YEAR_TABLE } = require('./academic-year.model')
const { DIMENSION_ESPACIAL_TABLE } = require('./dimension-espacial.model')
const { SUJETO_SOCIAL_TABLE} = require('./sujeto-social.model');
const { AREA_PRIORITARIA_TABLE } = require('./area-prioritaria');
const { LINEA_INVESTIGACION_TABLE } = require('./linea-investigacion.model');

const PROJECT_TABLE = 'project';


const ProjectSchema ={
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT
  },

  status: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  sujetoSocial:{
    allowNull: false,
    type: DataTypes.STRING
  },
  AcademicYearId: {
    field: 'academic_year_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ACADEMIC_YEAR_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
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
    onDelete: 'CASCADE'
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
  AreaPrioritariaId: {
    type: DataTypes.INTEGER,
    field: 'area_prioritaria_id',
    allowNull: true,
    references: {
      model: AREA_PRIORITARIA_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  LineaInvestigacionId: {
    type: DataTypes.INTEGER,
    field: 'linea_investigacion_id',
    allowNull: true,
    references: {
      model: LINEA_INVESTIGACION_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  DimensionEspacialId: {
    field: 'dimension_espacial_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: DIMENSION_ESPACIAL_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  // SujetoSocialId: {
  //   field: 'sujeto_social_id',
  //   allowNull: false,
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: SUJETO_SOCIAL_TABLE,
  //     key: 'id'
  //   },
  //   onUpdate: 'CASCADE',
  //   onDelete: 'CASCADE'
  // },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Project extends Model {
  static associate(models){
    this.belongsTo(models.Pnf, {as: 'pnf'});
    this.belongsTo(models.Trayecto, {as: 'trayecto'});
    this.belongsTo(models.Seccion, {as: 'seccion'});
    this.belongsTo(models.DimensionEspacial, {as: 'DimensionEspacial'});
    this.belongsTo(models.AreaPrioritaria, {as: 'AreaPrioritaria'});
    this.belongsTo(models.LineaInvestigacion, {as: 'LineaInvestigacion'});
    // this.belongsTo(models.SujetoSocial, {as: 'SujetoSocial'});
    this.belongsTo(models.AcademicYear, {as: 'AcademicYear'});
    this.hasMany(models.ProjectStudent,{
      as:'projectStudent',
      foreignKey:'projectId'
    })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: PROJECT_TABLE,
      modelName: 'Project',
      timestamps: false
    }
  }
}


module.exports = { PROJECT_TABLE,  ProjectSchema, Project}
