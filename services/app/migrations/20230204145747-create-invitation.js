'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invitations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quote: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      quote_src: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bride: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bride_img: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bride_nick: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bride_mother: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bride_father: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      groom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      groom_img: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      groom_nick: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      groom_mother: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      groom_father: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      matrimony_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      matrimony_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      matrimony_time_start: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      matrimony_time_end: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ceremonial_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ceremonial_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ceremonial_time_start: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ceremonial_time_end: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      map_location: {
        type: Sequelize.TEXT
      },
      address_ceremonial: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_matrimony: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      photo: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      story: {
        type: Sequelize.STRING
      },
      story_img: {
        type: Sequelize.STRING
      },
      wallet_bank: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      wallet_no: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      wallet_owner: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      MusicId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Musics',
          key: 'id'
        }, 
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      OrderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Orders',
          key: 'id'
        }, 
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
    await queryInterface.dropTable('Invitations');
  }
};