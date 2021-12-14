'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  const [
    articles,
    categories
  ] = await Promise.all([
    api.getArticles({comments: true}),
    api.getCategories(true)
  ]);
  res.render(`main`, {articles: articles.slice(0, 8), categories});
});

mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));

mainRouter.get(`/login`, (req, res) => res.render(`login`));

mainRouter.get(`/search`, async (req, res) => {
  const search = req.query.search;
  try {
    const results = await api.search(search);

    res.render(`search`, {
      results, search
    });
  } catch (error) {
    res.render(`search`, {
      results: [], search
    });
  }
});

mainRouter.get(`/categories`, (req, res) => res.render(`all-categories`));

module.exports = mainRouter;
