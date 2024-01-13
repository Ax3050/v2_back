'use strict';
const {LINEA_INVESTIGACION_TABLE} = require('../models/linea-investigacion.model')
const {AREA_PRIORITARIA_TABLE} = require('../models/area-prioritaria')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(LINEA_INVESTIGACION_TABLE, 'AreaPrioritariaId', {
      type: Sequelize.INTEGER,
      field: 'area_prioritaria_id',
      allowNull: true,
      references: {
        model: AREA_PRIORITARIA_TABLE,
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
