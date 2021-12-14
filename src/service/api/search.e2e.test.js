'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const search = require(`./search`);
const DataService = require(`../data-service/search`);
const {HttpCode} = require(`../../constants`);
const {mockData, mockCategories, mockUsers} = require(`./tests.mocks`);

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDB(mockDB, {categories: mockCategories, articles: mockData, users: mockUsers});
  search(app, new DataService(mockDB));
});

describe(`API returns articles based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `камни бесконечности`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 article found`, () => expect(response.body.length).toBe(1));
  test(`Article has correct id`, () => expect(response.body[0].title).toBe(`Как собрать камни бесконечности`));
});

describe(`API returns code 404 if nothing is found`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Продам свою душу`
      });
  });

  test(`Status code 404`, () => expect(response.statusCode).toBe(HttpCode.NOT_FOUND));
});

describe(`API returns 400 when query string is absent`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`);
  });

  test(`Status code 400`, () => expect(response.statusCode).toBe(HttpCode.BAD_REQUEST));
});
