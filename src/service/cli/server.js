'use strict';

const express = require(`express`);
const {getLogger} = require(`../lib/logger`);
const logger = getLogger({name: `api`});

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

app.use((req, res) => {
  res.status(HTTP_CODE.NOT_FOUND)
    .send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occurred on processing request: ${err.message}`);
});

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

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

    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occurred on server creation: ${err.message}`);
        }

        return logger.info(`Listening to connections on ${port}`);
      });

    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(1);
    }
  }
};
