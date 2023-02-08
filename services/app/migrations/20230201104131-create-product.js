'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      imgUrl: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      estimatedDay: { // ga awajib
        type: Sequelize.INTEGER
      },
      rating: { //? ga wajib
        type: Sequelize.DECIMAL
      },
      dpPrice: { // ga wajib
        type: Sequelize.INTEGER
      },
      status: { // ga wajib
        type: Sequelize.STRING
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
      CategoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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
    await queryInterface.dropTable('Products');
  }
};