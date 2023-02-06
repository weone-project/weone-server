'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vendor.hasMany(models.Product)
      Vendor.hasMany(models.Order)
    }
  }
  Vendor.init({
    name: {
      type: DataTypes.STRING,
      unique: { msg: "Name already used" },
      allowNull: false,
      validate: {
        notNull: { msg: 'Name is required' },
        notEmpty: { msg: 'Name is required' }
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: { msg: 'Email already registered' },
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Email is required' },
        notNull: { msg: 'Email is required' },
        isEmail: { msg: 'Format email is invalid!'},
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password is required' },
        notNull: { msg: 'Password is required' }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Phone Number is required' },
        notNull: { msg: 'Phone Number is required' }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'City is required' },
        notNull: { msg: 'City is required' }
      }
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Province is required' },
        notNull: { msg: 'Province is required' }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Adress is required' },
        notNull: { msg: 'Adress is required' }
      }
    },
    vendorImgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Vendor Img Url is required' },
        notNull: { msg: 'Vendor Img Url is required' }
      }
    },
  }, {
    sequelize,
    modelName: 'Vendor',
  });
  Vendor.beforeCreate((vendor, option) => {
    vendor.password = hashPassword(vendor.password);
  });
  return Vendor;
};