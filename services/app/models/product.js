'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Vendor)
      Product.belongsTo(models.Category)
      Product.hasMany(models.Order)
      Product.hasMany(models.Testimony)
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Product Name is required' },
        notEmpty: { msg: 'Product Name is required' }
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Description is required' },
        notEmpty: { msg: 'Description is required' }
      },
    },
    imgUrl: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notNull: { msg: 'Img Url is required' },
        notEmpty: { msg: 'Img Url is required' }
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Price is required' },
        notEmpty: { msg: 'Price is required' }
      },
    },
    estimatedDay: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      max: 7,
    },
    rating: {
      type: DataTypes.DECIMAL,
    },
    dpPrice: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Active'
    },
    VendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Vendor Id is required' },
        notEmpty: { msg: 'Vendor Id is required' }
      },
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Category Id is required' },
        notEmpty: { msg: 'Category Id is required' }
      },
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};