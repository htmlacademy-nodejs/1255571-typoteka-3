'use strict';

const {Router} = require(`express`);
const {HTTP_CODE} = require(`../../constants`);
const {ArticleService} = require(`../data-service/articles`);

const articleValidator = require(`../middlewares/article-validator`);
const articleExist = require(`../middlewares/article-exist`);

module.exports = (app, service, commentService) => {
  const route = new Router();

  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const articles = await service.findAll();
    res.status(HTTP_CODE.OK)
      .json(articles);
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = ArticleService.findOne(articleId);

    if (!article) {
      return res.status(HTTP_CODE.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    return res.status(HTTP_CODE.OK)
      .json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = ArticleService.create(req.body);

    return res.status(HTTP_CODE.CREATED)
      .json(article);
  });

  route.put(`/:articleId`, articleValidator, (req, res) => {
    const {articleId} = req.params;
    const article = ArticleService.update(articleId, req.body);

    return res.status(HTTP_CODE.OK)
      .json(article);
  });

  route.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = ArticleService.drop(articleId);

    return res.status(HTTP_CODE.OK)
      .json(article);
  });

  // COMMENTS

  route.get(`/:articleId/comments`, (req, res) => {
    const {articleId} = req.params;
    const article = ArticleService.findOne(articleId);

    if (!article) {
      return res.status(HTTP_CODE.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    const comments = article.comments;

    return res.status(HTTP_CODE.OK)
      .json(comments);
  });

  route.post(`/:articleId/comments`, [articleExist(articleValidator), articleValidator], (req, res) => {
    const {articleId} = req.params;
    const article = ArticleService.findOne(articleId);
    const comment = commentService.createComment(article, req.body);

    return res.status(HTTP_CODE.CREATED)
      .json(comment);
  });

  route.delete(`/:articleId/comments/:commentId`, [articleExist(articleValidator), articleValidator], (req, res) => {
    const {articleId} = req.params;
    const article = ArticleService.findOne(articleId);
    const commentId = commentService.dropComment(article, req.body);

    return res.status(HTTP_CODE.OK)
      .json(commentId);
  });

};
