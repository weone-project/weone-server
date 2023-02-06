'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Testimony extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Testimony.belongsTo(models.User)
      Testimony.belongsTo(models.Product)
    }
  }
  Testimony.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'User Id is required' },
        notNull: { msg: 'User Id is required' }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Product Id is required' },
        notNull: { msg: 'Product Id is required' }
      }
    },
    testimony: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Testimony is required' },
        notNull: { msg: 'Testimony is required' }
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Rating is required' },
        notNull: { msg: 'Rating is required' }
      }
    }
  }, {
    sequelize,
    modelName: 'Testimony',
  });
  return Testimony;
};