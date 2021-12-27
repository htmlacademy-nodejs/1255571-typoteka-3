'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const auth = require(`../middlewares/auth`);

const myRouter = new Router();

myRouter.get(`/`, auth, async (req, res) => {
  const articles = await api.getArticles({comments: false});
  res.render(`my`, {articles});
});

myRouter.get(`/comments`, auth, async (req, res) => {
  const articles = await api.getArticles({comments: true});
  res.render(`comments`, {articles});
});

module.exports = myRouter;
