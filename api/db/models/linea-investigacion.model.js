const { Model, DataTypes, Sequelize } = require('sequelize');
const { AREA_PRIORITARIA_TABLE } = require('./area-prioritaria');

const LINEA_INVESTIGACION_TABLE = 'linea_investigacion';

const LineaInvestigacionSchema ={
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
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class LineaInvestigacion extends Model {
  static associate(models){
    this.belongsTo(models.AreaPrioritaria, {as: 'AreaPrioritaria'});

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: LINEA_INVESTIGACION_TABLE,
      modelName: 'LineaInvestigacion',
      timestamps: false
    }
  }
}


module.exports = { LINEA_INVESTIGACION_TABLE,  LineaInvestigacionSchema, LineaInvestigacion}
