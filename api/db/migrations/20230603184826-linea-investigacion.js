'use strict';
const {LineaInvestigacionSchema, LINEA_INVESTIGACION_TABLE} = require('../models/linea-investigacion.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(LINEA_INVESTIGACION_TABLE, LineaInvestigacionSchema);
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
