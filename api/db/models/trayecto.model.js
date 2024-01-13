const { Model, DataTypes, Sequelize } = require('sequelize')

const TRAYECTO_TABLE = 'trayecto';

const TrayectoSchema ={
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

class Trayecto extends Model {
  static associate(models){

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: TRAYECTO_TABLE,
      modelName: 'Trayecto',
      timestamps: false
    }
  }
}


module.exports = { TRAYECTO_TABLE,  TrayectoSchema, Trayecto}
