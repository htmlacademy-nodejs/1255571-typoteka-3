'use strict';

const VARIABLE_LIST = {
  DEFAULT_COMMAND: `--help`,
  USER_ARGV_INDEX: 2,
  ExitCode: 1,
  DEFAULT_PORT: `3000`,
  MAX_ID_LENGTH: 6,
  API_PREFIX: `/api`,
};

const DATA_PATH = {
  FILE_SENTENCES_PATH: `./data/sentences.txt`,
  FILE_TITLES_PATH: `./data/titles.txt`,
  FILE_CATEGORIES_PATH: `./data/categories.txt`,
  FILE_COMMENTS_PATH: `./data/comments.txt`,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const HttpMethod = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

module.exports = {
  VARIABLE_LIST,
  HttpCode,
  DATA_PATH,
  Env,
  PictureRestrict,
  HttpMethod,
};
