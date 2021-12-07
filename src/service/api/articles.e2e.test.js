'use strict';

const express = require(`express`);
const request = require(`supertest`);

const articles = require(`./articles`);
const ArticleService = require(`../data-service/articles`);
const CommentService = require(`../data-service/comments`);
const {HttpCode} = require(`../../constants`);
const mockData = require(`./tests.mocks`);

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  articles(app, new ArticleService(cloneData), new CommentService(cloneData));
  return app;
};

describe(`API returns a list of all articles`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));

  test(`First article's id equals "kfA67p"`, () => expect(response.body[0].id).toBe(`kfA67p`));
});

describe(`API returns an article with given id`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/6h4jlk`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article's title is "Ёлки. История деревьев"`, () => expect(response.body.title).toBe(`Ёлки. История деревьев`));
});

describe(`API creates an article if data is valid`, () => {
  const newArticle = {
    title: `You’re tearing me apart, Lisa`,
    announce: `Oh, hi, Mark`,
    fullText: `I got the results of the test back. I definitely got breast cancer`,
    category: [
      `За жизнь`
    ],
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Articles count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(6))
  );
});

describe(`API refuses to create an article if data is invalid`, () => {
  const newArticle = {
    title: `You’re tearing me apart, Lisa`,
    announce: `Oh, hi, Mark`,
    fullText: `I got the results of the test back. I definitely got breast cancer`,
    category: [
      `За жизнь`
    ],
  };

  const app = createAPI();

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
  const newArticle = {
    title: `You’re tearing me apart, Lisa`,
    announce: `Oh, hi, Mark`,
    fullText: `I got the results of the test back. I definitely got breast cancer`,
    category: [
      `За жизнь`
    ],
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/DzTXyo`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Article is really changed`, () => request(app)
    .get(`/articles/DzTXyo`)
    .expect((res) => expect(res.body.title).toBe(`You’re tearing me apart, Lisa`))
  );
});

test(`API returns status code 404 when trying to change non-existent article`, () => {
  const app = createAPI();

  const validArticle = {
    title: `You’re tearing me apart, Lisa`,
    announce: `Oh, hi, Mark`,
    fullText: `I got the results of the test back. I definitely got breast cancer`,
    category: [
      `За жизнь`
    ],
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {
  const app = createAPI();

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
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/kfA67p`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`kfA67p`));

  test(`Article count is 4 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

test(`API refuses to delete non-existent article`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {
  const app = createAPI();

  return request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/kfA67p/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});
