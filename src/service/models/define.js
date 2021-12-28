'use strict';

const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineArticle = require(`./article`);
const defineUser = require(`./user`);
const Aliase = require(`./aliase`);
const {Model} = require(`sequelize`);

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Article = defineArticle(sequelize);
  const User = defineUser(sequelize);

  Article.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `articleId`, onDelete: `cascade`});
  Comment.belongsTo(Article, {foreignKey: `articleId`});

  User.hasMany(Article, {as: Aliase.ARTICLES, foreignKey: `userId`, onDelete: `cascade`});
  Article.belongsTo(User, {as: Aliase.USERS, foreignKey: `userId`});

  User.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `userId`, onDelete: `cascade`});
  Comment.belongsTo(User, {as: Aliase.USERS, foreignKey: `userId`});

  class ArticleCategory extends Model {}

  ArticleCategory.init({}, {
    sequelize,
    modelName: `articleCategories`,
    tableName: `article_categories`
  });
  Article.belongsToMany(Category, {through: ArticleCategory, as: Aliase.CATEGORIES, onDelete: `cascade`});
  Category.belongsToMany(Article, {through: ArticleCategory, as: Aliase.ARTICLES, onDelete: `cascade`});
  Category.hasMany(ArticleCategory, {as: Aliase.ARTICLE_CATEGORIES, onDelete: `cascade`});

  return {Category, Comment, Article, ArticleCategory, User};
};

module.exports = define;
