const { Model, DataTypes, Sequelize } = require('sequelize')

const ACADEMIC_YEAR_TABLE = 'academic_year';

const AcademicYearSchema ={

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    autoIncrement: true,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class AcademicYear extends Model {
  static associate(models){
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ACADEMIC_YEAR_TABLE,
      modelName: 'AcademicYear',
      timestamps: false
    }
  }
}


module.exports = { ACADEMIC_YEAR_TABLE,  AcademicYearSchema, AcademicYear}
