'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const {ensureArray, prepareErrors} = require(`../../utils`);
const upload = require(`../middlewares/upload`);
const auth = require(`../middlewares/auth`);
const csrf = require(`csurf`);
const csrfProtection = csrf();

const articlesRoutes = new Router();

const getEditArticleData = async (articleId) => {
  const [adticle, categories] = await Promise.all([
    api.getArticle(articleId),
    api.getCategories()
  ]);
  return [adticle, categories];
};

articlesRoutes.get(`/category/:id`, (req, res) => {
  res.send(`/articles/category/:id`);
});

articlesRoutes.get(`/add`, auth, async (req, res) => {
  const {query} = req;
  const article = Object.keys(query).length ? query : null;
  const categories = await api.getCategories();
  const date = new Date();

  res.render(`post-add`, {
    article,
    categories,
    date,
    csrfToken: req.csrfToken()
  });
});

articlesRoutes.post(`/add`, upload.single(`avatar`), csrfProtection, async (req, res) => {
  const {user} = req.session;
  const {body, file} = req;
  const articleData = {
    picture: file ? file.filename : ``,
    title: body.title,
    announce: body.announce,
    fullText: body.fullText,
    category: ensureArray(body.categories),
  };

  try {
    await api.createArticle({userId: user.id, articleData});
    res.redirect(`/my`);
  } catch (errors) {
    const validationMessages = prepareErrors(errors);
    const categories = await api.getCategories();
    res.render(`post-add`, {categories, validationMessages, csrfToken: req.csrfToken()});
  }
}
);

articlesRoutes.get(`/edit/:id`, auth, async (req, res) => {
  const {user} = req.session;
  const {id} = req.params;
  const [article, categories] = await getEditArticleData(id);
  res.render(`post-edit`, {id, article, categories, user});
});

articlesRoutes.post(`/edit/:id`, upload.single(`avatar`), csrfProtection, async (req, res) => {
  const {user} = req.session;
  const {body, file} = req;
  const {id} = req.params;
  const articleData = {
    picture: file ? file.filename : body[`old-image`],
    title: body.title,
    announce: body.announce,
    fullText: body.fullText,
    category: ensureArray(body.categories),
  };

  try {
    await api.editArticle(id, {userId: user.id, articleData});
    res.redirect(`/my`);
  } catch (errors) {
    const validationMessages = prepareErrors(errors);
    const [article, categories] = await getEditArticleData(id);
    res.render(`post-edit`, {id, article, categories, validationMessages, csrfToken: req.csrfToken()});
  }
});

articlesRoutes.get(`/:id`, async (req, res) => {
  const {user} = req.session;
  const {id} = req.params;
  const article = await api.getArticle(id);
  res.render(`post-detail`, {article, id, user});
});

articlesRoutes.post(`/:id/comments`, csrfProtection, async (req, res) => {
  const {user} = req.session;
  const {id} = req.params;
  const {comment} = req.body;
  try {
    await api.createComment(id, {userId: user.id, text: comment});
    res.redirect(`/${id}`);
  } catch (errors) {
    const validationMessages = prepareErrors(errors);
    const article = await api.getArticle(id);
    res.render(`post-detail`, {article, id, user, validationMessages, csrfToken: req.csrfToken()});
  }
});

module.exports = articlesRoutes;
