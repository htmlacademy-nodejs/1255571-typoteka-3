'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Article extends Model {}

const define = (sequelize) => Article.init({
  title: {
    type: new DataTypes.STRING(250),
    allowNull: false
  },
  announce: {
    type: new DataTypes.STRING(250),
    allowNull: false
  },
  fullText: {
    type: new DataTypes.STRING(1000),
  },
  picture: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: `Article`,
  tableName: `articles`
});

module.exports = define;
