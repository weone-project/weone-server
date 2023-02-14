'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const vendors = require('../json/vendors.json').map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.password = hashPassword(el.password)
      return el
    })
    await queryInterface.bulkInsert('Vendors', vendors, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Vendors', null, {});
  }
};
