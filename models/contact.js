'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Contact.belongsTo(models.User);
     Contact.hasMany(models.Order);
    }
  };
  Contact.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};