'use strict';

const {DataTypes, Model} = require(`sequelize`);

class User extends Model {}

const define = (sequelize) => User.init({
  email: {
    type: new DataTypes.STRING(50),
    allowNull: false
  },
  passwordHash: {
    type: new DataTypes.STRING(100),
    allowNull: false
  },
  firstName: {
    type: new DataTypes.STRING(50),
    allowNull: false
  },
  lastName: {
    type: new DataTypes.STRING(50),
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: `User`,
  tableName: `users`
});

module.exports = define;
