'use strict';

const express = require(`express`);
const {getLogger} = require(`../lib/logger`);
const logger = getLogger({name: `api`});
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const helmet = require('helmet');

const {
  VARIABLE_LIST,
  HttpCode,
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

const app = express();

app.use(express.json());

const routes = new Router();
defineModels(sequelize);

(async () => {
  categories(routes, new CategoryService(sequelize));
  search(routes, new SearchService(sequelize));
  articles(routes, new ArticleService(sequelize), new CommentService(sequelize));
})();

app.use(VARIABLE_LIST.API_PREFIX, routes);

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

module.exports = {
  name: `--server`,
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);

    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || VARIABLE_LIST.DEFAULT_PORT;

    app.use((req, res) => {
      res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
      logger.error(`Route not found: ${req.url}`);
    });

    app.use((err, _req, _res, _next) => {
      logger.error(`An error occurred on processing request: ${err.message}`);
    });

    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
        }
      },
      xssFilter: true,
    }));

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
