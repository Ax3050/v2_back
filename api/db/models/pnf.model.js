const { Model, DataTypes, Sequelize } = require('sequelize')

const PNF_TABLE = 'pnf';

const PnfSchema ={
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
  code: {
    allowNull: false,
    type: DataTypes.STRING
  },
  trayectos: {
    field: 'trayectos',
    allowNull: true,
    type: DataTypes.STRING
  },

  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Pnf extends Model {
  static associate(models){
    this.hasMany(models.Seccion,{
      as:'seccion',
      foreignKey:'pnfId'
    })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: PNF_TABLE,
      modelName: 'Pnf',
      timestamps: false
    }
  }
}


module.exports = { PNF_TABLE,  PnfSchema, Pnf}
