'use strict';
const {INVESTIGATOR_TABLE} = require('../models/investigator.model')
const {ACADEMIC_YEAR_TABLE} = require('../models/academic-year.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(INVESTIGATOR_TABLE, 'academicYearId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: ACADEMIC_YEAR_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
