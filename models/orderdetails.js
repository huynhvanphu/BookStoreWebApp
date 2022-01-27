'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderDetails.belongsTo(models.Product);
      OrderDetails.belongsTo(models.Order);
    }
  };
  OrderDetails.init({
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'OrderDetails',
  });
  return OrderDetails;
};