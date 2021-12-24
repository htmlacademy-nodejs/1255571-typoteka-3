'use strict';

const ArticleService = require(`./articles`);
const CategoryService = require(`./category`);
const SearchService = require(`./search`);
const CommentService = require(`./comments`);
const UserService = require(`./user`);

module.exports = {
  ArticleService,
  CategoryService,
  SearchService,
  CommentService,
  UserService,
};
