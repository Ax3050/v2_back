const { Model, DataTypes, Sequelize } = require('sequelize')
const SUJETO_SOCIAL_TABLE = 'sujeto_social';
const { DIMENSION_ESPACIAL_TABLE } = require('./dimension-espacial.model')

const SujetoSocialSchema ={
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

  DimensionEspacialId: {
    field: 'dimension_espacial_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: DIMENSION_ESPACIAL_TABLE,
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

class SujetoSocial extends Model {
  static associate(models){
    this.belongsTo(models.DimensionEspacial, {as: 'DimensionEspacial'});
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: SUJETO_SOCIAL_TABLE,
      modelName: 'SujetoSocial',
      timestamps: false
    }
  }
}


module.exports = { SUJETO_SOCIAL_TABLE,  SujetoSocialSchema, SujetoSocial}
