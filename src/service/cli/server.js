'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;

const {
  DEFAULT_PORT,
  FILENAME,
  HttpCode
} = require(`../../constants`);

const app = express();

app.use(express.json());

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.get(`/posts`, async (req, res) => {
      try {
        const fileContent = await fs.readFile(FILENAME);
        const mocks = JSON.parse(fileContent);
        res.json(mocks);
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
