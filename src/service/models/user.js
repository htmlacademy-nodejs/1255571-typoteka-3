'use strict';

const {DataTypes, Model} = require(`sequelize`);

class User extends Model {}

const define = (sequelize) => User.init({
  email: {
    // eslint-disable-next-line new-cap
    type: DataTypes.STRING(50),
    allowNull: false
  },
  passwordHash: {
    // eslint-disable-next-line new-cap
    type: DataTypes.STRING(100),
    allowNull: false
  },
  firstName: {
    // eslint-disable-next-line new-cap
    type: DataTypes.STRING(50),
    allowNull: false
  },
  lastName: {
    // eslint-disable-next-line new-cap
    type: DataTypes.STRING(50),
    allowNull: false
  },
  avatar: {
    // eslint-disable-next-line new-cap
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: `User`,
  tableName: `users`
});

module.exports = define;
