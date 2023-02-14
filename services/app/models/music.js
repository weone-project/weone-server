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
          msg: "Band Name is required"
        },
        notEmpty : {
          msg: "Band Name is required"
        }
      }
    },
    song: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: "Song Title is required"
        },
        notEmpty : {
          msg: "Song Title is required"
        }
      }
    },
    song_src: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: "Song Url is required"
        },
        notEmpty : {
          msg: "Song Url is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Musics',
  });
  return Musics;
};