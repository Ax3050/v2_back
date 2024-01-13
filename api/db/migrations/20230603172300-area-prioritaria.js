'use strict';
const {AreaPrioritariaSchema, AREA_PRIORITARIA_TABLE} = require('../models/area-prioritaria')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(AREA_PRIORITARIA_TABLE, AreaPrioritariaSchema);
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
