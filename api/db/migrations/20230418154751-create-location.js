'use strict';
const { StateSchema, STATE_TABLE} = require('../models/estado.model')
const { MunicipioSchema, MUNICIPIO_TABLE} = require('../models/municipio.model')
const { ParroquiaSchema, PARROQUIA_TABLE} = require('../models/parroquia.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(STATE_TABLE, StateSchema);
    await queryInterface.createTable(MUNICIPIO_TABLE, MunicipioSchema);
    await queryInterface.createTable(PARROQUIA_TABLE, ParroquiaSchema);
  },

  async down (queryInterface) {
    await queryInterface.drop(STATE_TABLE);
    await queryInterface.drop(MUNICIPIO_TABLE);
    await queryInterface.drop(PARROQUIA_TABLE);
  }
};
