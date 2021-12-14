'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const articles = require(`./articles`);
const ArticleService = require(`../data-service/articles`);
const CommentService = require(`../data-service/comments`);
const {HttpCode} = require(`../../constants`);
const {mockData, mockCategories, mockUsers} = require(`./tests.mocks`);

const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  await initDB(mockDB, {categories: mockCategories, articles: mockData, users: mockUsers});
  const app = express();
  app.use(express.json());
  articles(app, new ArticleService(mockDB), new CommentService(mockDB));
  return app;
};

let app;

const newArticle = {
  title: `You’re tearing me apart, Lisa`,
  announce: `Oh, hi, Mark`,
  fullText: `I got the results of the test back. I definitely got breast cancer`,
  categories: [1, 2],
};

beforeAll(async () => {
  app = await createAPI();
});

describe(`API returns a list of all articles`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));
});

describe(`API returns an article with given id`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/3`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
});

describe(`API creates an article if data is valid`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns article created`, () => expect(response.body.title).toBe(newArticle.title));

  test(`Articles count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(6))
  );
});

describe(`API refuses to create an article if data is invalid`, () => {
  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent article`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/5`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () => expect(response.body).toBe(true));

  test(`Article is really changed`, () => request(app)
    .get(`/articles/5`)
    .expect((res) => expect(res.body.title).toBe(`You’re tearing me apart, Lisa`))
  );
});

test(`API returns status code 404 when trying to change non-existent article`, async () => {
  return await request(app)
    .put(`/articles/NOEXST`)
    .send(newArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {
  const invalidArticle = {
    title: `You’re tearing me apart, Lisa`,
    announce: `Oh, hi, Mark`,
    fullText: `I got the results of the test back. I definitely got breast cancer`,
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/articles/3`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body).toBe(true));

  test(`Article count is 4 now`, async () => await request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

test(`API refuses to delete non-existent article`, async () => {
  return await request(app)
    .delete(`/articles/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment to non-existent article and returns status code 404`, async () => {
  return await request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete non-existent comment`, async () => {
  return await request(app)
    .delete(`/articles/2/comments/NOEXST`)
    .expect(HttpCode.OK);
});
