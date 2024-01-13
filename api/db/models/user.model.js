const { Model, DataTypes, Sequelize } = require('sequelize')
const { PEOPLE_TABLE } = require('./people.model')
const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  peopleId: {
    field: 'people_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: PEOPLE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE'
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recovery_code: {
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

class User extends Model {
  static associate(models){
    this.belongsTo(models.People, {as: 'people'});
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}


module.exports = { USER_TABLE,  UserSchema, User}
