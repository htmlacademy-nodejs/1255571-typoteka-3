'use strict';

const express = require(`express`);

const {
  VARIABLE_LIST,
  HTTP_CODE,
} = require(`../../constants`);

const {
  CategoryService,
  SearchService,
  ArticleService,
  CommentService,
} = require(`../data-service`);

const {Router} = require(`express`);
const {
  categories,
  articles,
  search,
} = require(`../api`);

const {getMockData} = require(`../lib/get-mock-data`);

const app = express();

app.use(express.json());

const routes = new Router();
let mockData;

(async () => {
  mockData = await getMockData();

  categories(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
  articles(app, new ArticleService(mockData), new CommentService(mockData));
})();

app.use(VARIABLE_LIST.API_PREFIX, routes);

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || VARIABLE_LIST.DEFAULT_PORT;

    app.get(`/posts`, async (req, res) => {
      try {
        res.json(mockData);
      } catch (_err) {
        res.send([]);
      }
    });

    app.use((req, res) => res
      .status(HTTP_CODE.NOT_FOUND)
      .send(`Not found`));

    app.listen(port, () => {
      console.log(`Сервер запущен по адресу: http://localhost:${port}`);
    });
  }
};
