'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const categories = require(`./categories`);
const CategoryService = require(`../data-service/category`);
const {HttpCode} = require(`../../constants`);
const {mockData, mockCategories, mockUsers} = require(`./tests.mocks`);

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDB(mockDB, {categories: mockCategories, articles: mockData, users: mockUsers});
  categories(app, new CategoryService(mockDB));
});

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 4 categories`, () => expect(response.body.length).toBe(4));

  test(`Category names are "За жизнь", "Деревья", "Разное", "Железо"`,
      () => expect(response.body.map((it) => it.name)).toEqual(
          expect.arrayContaining([`За жизнь`, `Деревья`, `Разное`, `Железо`])
      )
  );
});
