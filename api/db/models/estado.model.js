const { Model, DataTypes, Sequelize } = require('sequelize')
const STATE_TABLE = 'estado';

const StateSchema ={
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
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Estado extends Model {
  static associate(models){
    this.hasMany(models.Municipio,{
      as:'municipio',
      foreignKey:'estadoId'
    })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: STATE_TABLE,
      modelName: 'Estado',
      timestamps: false
    }
  }
}


module.exports = { STATE_TABLE,  StateSchema, Estado}
