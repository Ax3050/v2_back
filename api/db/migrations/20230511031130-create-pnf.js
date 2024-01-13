'use strict';
const {PnfSchema, PNF_TABLE} = require('../models/pnf.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(PNF_TABLE, PnfSchema);
  },

  async down (queryInterface) {
    await queryInterface.drop(PNF_TABLE);

  }
};
