'use strict';
const {DimensionEspacialSchema, DIMENSION_ESPACIAL_TABLE} = require('../models/dimension-espacial.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(DIMENSION_ESPACIAL_TABLE, DimensionEspacialSchema);
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
