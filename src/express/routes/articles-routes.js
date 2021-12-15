'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);
const {ensureArray} = require(`../../utils`);

const UPLOAD_DIR = `../upload/img/`;

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

const articlesRoutes = new Router();

articlesRoutes.get(`/category/:id`, (req, res) => {
  res.send(`/articles/category/:id`);
});

articlesRoutes.get(`/add`, async (req, res) => {
  const {query} = req;
  const article = Object.keys(query).length ? query : null;
  const categories = await api.getCategories();
  const date = new Date();

  res.render(`post-add`, {
    article,
    categories,
    date,
  });
});

articlesRoutes.post(`/add`,
    upload.single(`avatar`),
    async (req, res) => {
      const {body, file} = req;
      const articleData = {
        picture: file ? file.filename : ``,
        title: body.title,
        announce: body.announce,
        fullText: body.fullText,
        category: ensureArray(body.category),
      };

      try {
        await api.createArticle(articleData);
        res.redirect(`/my`);
      } catch (error) {
        res.redirect(`back`);
      }
    }
);

articlesRoutes.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories()
  ]);
  res.render(`post-edit`, {article, categories});
});

articlesRoutes.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const article = await api.getArticle(id);
  res.render(`post-detail`, {article});
});

module.exports = articlesRoutes;
