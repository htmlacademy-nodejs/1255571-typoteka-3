'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const {ArticleService} = require(`../data-service/articles`);

const {articleValidator} = require(`../middlewares/articleValidator`);
const {articleExist} = require(`../middlewares/articleExist`);

const route = new Router();

console.log(articleValidator);

module.exports = (app, service) => {
  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const articles = await service.findAll();
    res.status(HttpCode.OK)
      .json(articles);
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = ArticleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK)
      .json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = ArticleService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(article);
  });

  route.put(`/:articleId`, articleValidator, (req, res) => {
    const {articleId} = req.params;
    const article = ArticleService.update(articleId, req.body);

    return res.status(HttpCode.OK)
      .json(article);
  });

  route.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = ArticleService.drop(articleId);

    return res.status(HttpCode.OK)
      .json(article);
  });

  // COMMENTS

  route.get(`/:articleId/comments`, (req, res) => {
    const {articleId} = req.params;
    const article = ArticleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    const comments = article.comments;

    return res.status(HttpCode.OK)
      .json(comments);
  });

  route.post(`/:articleId/comments`, [articleExist(articleValidator), articleValidator], (req, res) => {
    const {article} = res.locals;
    const comment = ArticleService.createComment(article, req.body);

    return res.status(HttpCode.CREATED)
      .json(comment);
  });

  route.delete(`/:articleId/comments/:commentId`, [articleExist(articleValidator), articleValidator], (req, res) => {
    const {article} = res.locals;
    const commentId = ArticleService.dropComment(article, req.body);

    return res.status(HttpCode.OK)
      .json(commentId);
  });

};
