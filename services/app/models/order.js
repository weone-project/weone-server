'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User)
      Order.belongsTo(models.Product)
    }
  }
  Order.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'UserId is required' },
        notNull: { msg: 'UserId is required' }
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
    reservationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Reservation Date is required' },
        notNull: { msg: 'Reservation Date is required' }
      }
    },
    paymentStatus: {
      type: DataTypes.STRING,
    },
    fullPayment: {
      type: DataTypes.INTEGER,
    },
    downPayment: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
      min: 5,
      defaultValue: 1,
    },
    notes: {
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};