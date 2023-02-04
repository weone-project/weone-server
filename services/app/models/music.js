'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Musics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Musics.hasMany(models.Invitations)
    }
  }
  Musics.init({
    band: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: "Nama Band Mohon diisi"
        },
        notEmpty : {
          msg: "Nama band Mohon diisi"
        }
      }
    },
    song: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: "Judul Lagu Mohon diisi"
        },
        notEmpty : {
          msg: "Judul Lagu Mohon diisi"
        }
      }
    },
    song_src: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: "Source Url Lagu Mohon diisi"
        },
        notEmpty : {
          msg: "Source Url Lagu Mohon diisi"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Musics',
  });
  return Musics;
};