'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const upload = require(`../middlewares/upload`);
const {prepareErrors} = require(`../../utils`);
const auth = require(`../middlewares/auth`);

const ARTICLES_PER_PAGE = 8;

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  const {user} = req.session;
  let {page = 1} = req.query;
  page = +page;
  const limit = ARTICLES_PER_PAGE;

  const offset = (page - 1) * ARTICLES_PER_PAGE;

  const [
    {count, articles},
    categories
  ] = await Promise.all([
    api.getArticles({limit, offset, comments: true}),
    api.getCategories(true)
  ]);

  const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);

  res.render(`main`, {articles, page, totalPages, categories, user});
});

mainRouter.get(`/register`, (req, res) => {

  res.render(`sign-up`);
});

mainRouter.post(`/register`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const userData = {
    avatar: file ? file.filename : ``,
    firstName: body[`firstname`],
    lastName: body[`lastname`],
    email: body[`email`],
    password: body[`password`],
    passwordRepeated: body[`password-again`]
  };

  try {
    await api.createUser(userData);
    res.redirect(`/login`);
  } catch (errors) {
    const validationMessages = prepareErrors(errors);
    res.render(`sign-up`, {validationMessages});
  }
});

mainRouter.get(`/login`, (req, res) => res.render(`login`));

mainRouter.post(`/login`, async (req, res) => {
  try {
    const user = await api.auth(req.body[`email`], req.body[`password`]);
    req.session.user = user;
    req.session.save(() => {
      res.redirect(`/`);
    });
  } catch (errors) {
    const validationMessages = prepareErrors(errors);
    const {user} = req.session;
    res.render(`login`, {user, validationMessages});
  }
});

mainRouter.get(`/logout`, (req, res) => {
  delete req.session.user;
  res.redirect(`/`);
});

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

mainRouter.get(`/categories`, auth, (req, res) => {

  res.render(`all-categories`)
});

module.exports = mainRouter;
