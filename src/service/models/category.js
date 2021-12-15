'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Category extends Model {}

const define = (sequelize) => Category.init({
  name: {
    type: new DataTypes.STRING(30),
    allowNull: false
  }
}, {
  sequelize,
  modelName: `Category`,
  tableName: `categories`
});

module.exports = define;
