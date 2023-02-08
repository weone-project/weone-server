'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Greets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Greets.belongsTo(models.Invitations)
    }
  }
  Greets.init({
    guest: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required"
        },
        notEmpty: {
          msg: "Name is required"
        }
      }
    },
    presence: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Presence is required"
        },
        notEmpty: {
          msg: "Presence is required"
        }
      }
    },
    greeting: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Greetings is required"
        },
        notEmpty: {
          msg: "Greetings is required"
        }
      }
    },
    date: DataTypes.DATE,
    InvitationId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Greets',
  });

  Greets.beforeCreate((greet, option) => {
    greet.date = greet.createdAt;
  });

  return Greets;
};