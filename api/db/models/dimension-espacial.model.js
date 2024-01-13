const { Model, DataTypes, Sequelize } = require('sequelize');
const { PARROQUIA_TABLE } = require('./parroquia.model');

const DIMENSION_ESPACIAL_TABLE = 'dimension_espacial';

const DimensionEspacialSchema ={
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
  parroquiaId: {
    field: 'parroquiaId',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PARROQUIA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class DimensionEspacial extends Model {
  static associate(models){
    this.belongsTo(models.Parroquia, {as: 'parroquia'});
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: DIMENSION_ESPACIAL_TABLE,
      modelName: 'DimensionEspacial',
      timestamps: false
    }
  }
}


module.exports = { DIMENSION_ESPACIAL_TABLE,  DimensionEspacialSchema, DimensionEspacial}
