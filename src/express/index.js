'use strict';

const express = require(`express`);
const routes = require(`./routes`);

const DEFAULT_PORT = 8080;

const app = express();

app.use(`/articles`, routes.articlesRoutes);
app.use(`/my`, routes.myRoutes);
app.use(`/`, routes.mainRoutes);

app.listen(DEFAULT_PORT);
