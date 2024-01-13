'use strict';

const { DIMENSION_ESPACIAL_TABLE } = require('../models/dimension-espacial.model');
const { PARROQUIA_TABLE } = require('../models/parroquia.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(DIMENSION_ESPACIAL_TABLE, 'parroquiaId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: PARROQUIA_TABLE,
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
