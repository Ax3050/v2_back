'use strict';
const {PeopleSchema, PEOPLE_TABLE} = require('../models/people.model')
const {UserSchema, USER_TABLE} = require('../models/user.model')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(PEOPLE_TABLE, PeopleSchema);
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  async down (queryInterface) {
    await queryInterface.drop(USER_TABLE);
  }
};
