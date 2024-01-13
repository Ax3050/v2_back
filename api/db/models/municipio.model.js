const { Model, DataTypes, Sequelize } = require('sequelize')
const MUNICIPIO_TABLE = 'municipio';
const { STATE_TABLE } = require('./estado.model')

const MunicipioSchema ={
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
  estadoId: {
    field: 'estado_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: STATE_TABLE,
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

class Municipio extends Model {
  static associate(models){
    this.belongsTo(models.Estado, {as: 'estado'});
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: MUNICIPIO_TABLE,
      modelName: 'Municipio',
      timestamps: false
    }
  }
}


module.exports = { MUNICIPIO_TABLE,  MunicipioSchema, Municipio}
