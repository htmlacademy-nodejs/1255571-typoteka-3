'use strict';

const {Router} = require(`express`);
const {HTTP_CODE} = require(`../../constants`);

module.exports = (app, service) => {
  const route = new Router();

  app.use(`/search`, route);

  route.get(`/`, async (req, res) => {
    const {query} = req.query;
    const atricles = await service.find(query);

    res.status(HTTP_CODE.OK)
      .json(atricles);
  });
};
