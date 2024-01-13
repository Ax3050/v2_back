'use strict';
const {SujetoSocialSchema, SUJETO_SOCIAL_TABLE} = require('../models/sujeto-social.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(SUJETO_SOCIAL_TABLE, SujetoSocialSchema);

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
