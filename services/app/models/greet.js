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
        notNull : {
          msg: "Nama Mohon diisi"
        },
        notEmpty : {
          msg: "Nama Mohon diisi"
        }
      }
    },
    presence: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: "Kehadiran mohon dipilih"
        },
        notEmpty : {
          msg: "Kehadiran Mohon dipilih"
        }
      }
    },
    greeting: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: "Ucapan Mohon diisi"
        },
        notEmpty : {
          msg: "Ucapan Mohon diisi"
        }
      }
    },
    date: DataTypes.DATE,
    InvitationId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Greets',
  });
  return Greets;
};