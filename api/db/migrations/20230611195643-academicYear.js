'use strict';
const {AcademicYearSchema, ACADEMIC_YEAR_TABLE} = require('../models/academic-year.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ACADEMIC_YEAR_TABLE, AcademicYearSchema);
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
