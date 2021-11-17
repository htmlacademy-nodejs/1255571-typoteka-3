'use strict';

const express = require(`express`);

const {
  DEFAULT_PORT,
  HttpCode,
  API_PREFIX
} = require(`../../constants`);
const routes = require(`../api`);

const {getMockData} = require(`../lib/get-mock-data`);

const app = express();

app.use(express.json());

app.use(API_PREFIX, routes);

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.get(`/posts`, async (req, res) => {
      const mockData = await getMockData();

      try {
        res.json(mockData);
      } catch (_err) {
        res.send([]);
      }
    });

    app.use((req, res) => res
      .status(HttpCode.NOT_FOUND)
      .send(`Not found`));

    app.listen(port, () => {
      console.log(`Сервер запущен по адресу: http://localhost:${port}`);
    });
  }
};
