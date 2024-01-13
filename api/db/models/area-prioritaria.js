const { Model, DataTypes, Sequelize } = require('sequelize');
const { PNF_TABLE } = require('./pnf.model');

const AREA_PRIORITARIA_TABLE = 'area_prioritaria';

const AreaPrioritariaSchema ={
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
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class AreaPrioritaria extends Model {
  static associate(models){
    this.belongsTo(models.Pnf, { as: 'pnf' });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: AREA_PRIORITARIA_TABLE,
      modelName: 'AreaPrioritaria',
      timestamps: false
    }
  }
}


module.exports = { AREA_PRIORITARIA_TABLE,  AreaPrioritariaSchema, AreaPrioritaria}
