'use strict';

const { PROJECT_STUDENT_TABLE, ProjectStudentSchema } = require('../models/project-student.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(PROJECT_STUDENT_TABLE, ProjectStudentSchema);
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
