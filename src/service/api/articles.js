'use strict';

const {Router} = require(`express`);
const {HTTP_CODE} = require(`../../constants`);

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
    const article = service.findOne(articleId);

    if (!article) {
      return res.status(HTTP_CODE.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    return res.status(HTTP_CODE.OK)
      .json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = service.create(req.body);

    return res.status(HTTP_CODE.CREATED)
      .json(article);
  });

  route.put(`/:articleId`, [articleValidator, articleExist(service)], (req, res) => {
    const {articleId} = req.params;
    const article = service.update(articleId, req.body);

    return res.status(HTTP_CODE.OK)
      .json(article);
  });

  route.delete(`/:articleId`, articleExist(service), (req, res) => {
    const {articleId} = req.params;
    const article = service.drop(articleId);

    return res.status(HTTP_CODE.OK)
      .json(article);
  });

  // COMMENTS

  route.get(`/:articleId/comments`, (req, res) => {
    const {articleId} = req.params;
    const article = service.findOne(articleId);

    if (!article) {
      return res.status(HTTP_CODE.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    const comments = article.comments;

    return res.status(HTTP_CODE.OK)
      .json(comments);
  });

  route.post(`/:articleId/comments`, articleExist(service), (req, res) => {
    const {articleId} = req.params;
    const article = service.findOne(articleId);
    const comment = commentService.createComment(article, req.body);

    return res.status(HTTP_CODE.CREATED)
      .json(comment);
  });

  route.delete(`/:articleId/comments/:commentId`, articleExist(service), (req, res) => {
    const {articleId} = req.params;
    const article = service.findOne(articleId);
    const commentId = commentService.dropComment(article, req.body);

    if (commentId === null) {
      return res.status(HTTP_CODE.NOT_FOUND)
        .send(`Not found comment`);
    }

    return res.status(HTTP_CODE.OK)
      .json(commentId);
  });

};
