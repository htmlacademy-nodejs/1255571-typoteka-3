'use strict';

const {Router} = require(`express`);
const {getMockData} = require(`../lib/get-mock-data`);

const categories = require(`./categories`);
const articles = require(`./articles`);
const search = require(`./search`);

const {
  CategoryService,
  SearchService,
  ArticleService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  categories(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
  articles(app, new ArticleService(mockData));
})();

module.exports = app;
