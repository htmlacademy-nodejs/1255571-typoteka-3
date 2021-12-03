'use strict';

const {Router} = require(`express`);
const {HTTP_CODE} = require(`../../constants`);

module.exports = (app, service) => {
  const route = new Router();

  app.use(`/search`, route);

  route.get(`/`, async (req, res) => {
    const {query} = req.query;

    if (typeof query === `undefined`) {
      return res.status(HTTP_CODE.BAD_REQUEST)
        .send(`Bad request`);
    }

    const atricles = await service.find(query);

    if (!atricles || atricles.length === 0) {
      return res.status(HTTP_CODE.NOT_FOUND)
        .send(`Not found with ${query}`);
    }

    return res.status(HTTP_CODE.OK)
      .json(atricles);
  });
};
