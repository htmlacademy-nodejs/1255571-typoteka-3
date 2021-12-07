'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

module.exports = (app, service) => {
  const route = new Router();

  app.use(`/search`, route);

  route.get(`/`, async (req, res) => {
    const {query} = req.query;

    if (typeof query === `undefined`) {
      return res.status(HttpCode.BAD_REQUEST)
        .send(`Bad request`);
    }

    const atricles = await service.find(query);

    if (!atricles || atricles.length === 0) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${query}`);
    }

    return res.status(HttpCode.OK)
      .json(atricles);
  });
};
