'use strict';

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);
const {HTTP_CODE} = require(`../../constants`);
const mockData = require(`./tests.mocks`);

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns articles based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `камни бесконечности`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HTTP_CODE.OK));
  test(`1 article found`, () => expect(response.body.length).toBe(1));
  test(`Article has correct id`, () => expect(response.body[0].id).toBe(`GchHBb`));
});

test(`API returns code 404 if nothing is found`,
    () => request(app)
    .get(`/search`)
    .query({
      query: `Продам свою душу`
    })
    .expect(HTTP_CODE.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
    () => request(app)
    .get(`/search`)
    .expect(HTTP_CODE.BAD_REQUEST)
);
