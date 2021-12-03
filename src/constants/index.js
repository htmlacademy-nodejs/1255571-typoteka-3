'use strict';

const VARIABLE_LIST = {
  DEFAULT_COMMAND: `--help`,
  USER_ARGV_INDEX: 2,
  ExitCode: 1,
  DEFAULT_PORT: `3000`,
  FILENAME: `mocks.json`,
  MAX_ID_LENGTH: 6,
  API_PREFIX: `/api`,
};

const DATA_PATH = {
  FILE_SENTENCES_PATH: `./data/sentences.txt`,
  FILE_TITLES_PATH: `./data/titles.txt`,
  FILE_CATEGORIES_PATH: `./data/categories.txt`,
  FILE_COMMENTS_PATH: `./data/comments.txt`,
};

const HTTP_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const ENV_LIST = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

module.exports = {
  VARIABLE_LIST,
  HTTP_CODE,
  DATA_PATH,
  ENV_LIST,
};
