'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      ProductId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      VendorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Vendors',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      reservationDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      rescheduleDate: {
        type: Sequelize.DATE,
      },
      rescheduleStatus: {
        type: Sequelize.STRING
      },
      paymentStatus: { // gawajib
        type: Sequelize.STRING
      },
      fullPayment: { // gawajib
        type: Sequelize.INTEGER
      },
      downPayment: { // gawajib
        type: Sequelize.INTEGER
      },
      quantity: { // minimum & default 1 
        type: Sequelize.INTEGER
      },
      notes: { // ga wajib
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};