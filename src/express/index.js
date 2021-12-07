'use strict';

const express = require(`express`);
const routes = require(`./routes`);
const path = require(`path`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;
const UPLOAD_DIR = `upload`;

const app = express();

app.use(`/articles`, routes.articlesRoutes);
app.use(`/my`, routes.myRoutes);
app.use(`/`, routes.mainRoutes);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(DEFAULT_PORT);
