'use strict';

const { AREA_PRIORITARIA_TABLE } = require('../models/area-prioritaria');
const { PNF_TABLE } = require('../models/pnf.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(AREA_PRIORITARIA_TABLE, 'pnf_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: PNF_TABLE,
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
