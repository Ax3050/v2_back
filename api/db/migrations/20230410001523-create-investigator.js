'use strict';

const {InvestigatorSchema, INVESTIGATOR_TABLE} = require('../models/investigator.model')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(INVESTIGATOR_TABLE, InvestigatorSchema);
  },

  async down (queryInterface) {
    await queryInterface.drop(INVESTIGATOR_TABLE);
  }
};
