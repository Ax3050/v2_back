const { Model, DataTypes, Sequelize } = require('sequelize')

const PEOPLE_TABLE = 'people';

const PeopleSchema ={
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
  lastname: {
    allowNull: false,
    type: DataTypes.STRING
  },
  nationality: {
    allowNull: false,
    type: DataTypes.INTEGER

  },
  cedula: {
    allowNull: false,
    type: DataTypes.STRING(8),
    unique: {
      args: true,
      msg: 'El nombre de usuario ya está en uso',
    },

  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class People extends Model {
  static associate(models){
    this.hasOne(models.User, {
      as: 'user',
      foreignKey: 'peopleId'
    });

    this.hasMany(models.Teacher,{
      as: 'teacher',
      foreignKey: 'peopleId'
    })

    this.hasOne(models.Investigator, {
      as: 'investigator',
      foreignKey: 'peopleId'
    });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: PEOPLE_TABLE,
      modelName: 'People',
      timestamps: false
    }
  }
}


module.exports = { PEOPLE_TABLE,  PeopleSchema, People}
