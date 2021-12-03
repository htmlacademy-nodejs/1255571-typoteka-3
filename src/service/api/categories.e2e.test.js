'use strict';

const express = require(`express`);
const request = require(`supertest`);

const categories = require(`./categories`);
const CategoryService = require(`../data-service/category`);
const {HTTP_CODE} = require(`../../constants`);
const mockData = require(`./tests.mocks`);

const app = express();
app.use(express.json());
categories(app, new CategoryService(mockData));

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HTTP_CODE.OK));
  test(`Returns list of 3 categories`, () => expect(response.body.length).toBe(4));

  test(`Category names are "За жизнь", "Деревья", "Разное"`,
      () => expect(response.body).toEqual(
          expect.arrayContaining([`За жизнь`, `Деревья`, `Разное`])
      )
  );
});
