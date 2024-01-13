const { Model, DataTypes, Sequelize } = require('sequelize')
const PARROQUIA_TABLE = 'parroquia';
const { MUNICIPIO_TABLE } = require('./municipio.model')

const ParroquiaSchema ={
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
  municipioId: {
    field: 'municipio_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: MUNICIPIO_TABLE,
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

class Parroquia extends Model {
  static associate(models){
    this.belongsTo(models.Municipio, {as: 'municipio'});
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: PARROQUIA_TABLE,
      modelName: 'Parroquia',
      timestamps: false
    }
  }
}


module.exports = { PARROQUIA_TABLE,  ParroquiaSchema, Parroquia}
