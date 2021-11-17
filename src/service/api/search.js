'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, async (req, res) => {
    const {query} = req.query;
    const atricles = await service.find(query);

    res.status(HttpCode.OK)
      .json(atricles);
  });
};
