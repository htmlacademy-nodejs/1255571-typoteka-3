'use strict';

const {HttpCode} = require(`../../constants`);
const Joi = require(`joi`);

const ErrorArticleMessage = {
  CATEGORIES: `Не выбрана ни одна категория публикации`,
  TITLE_MIN: `Заголовок содержит меньше 30 символов`,
  TITLE_MAX: `Заголовок не может содержать более 250 символов`,
  ANNOUNCE_MIN: `Анонс содержит меньше 30 символов`,
  ANNOUNCE_MAX: `Анонс не может содержать более 250 символов`,
  FULLTEXT_MAX: `Полный текст публикации не может содержать более 1000 символов`,
  DATE_CREATE: `Дата публикации не может быть пустой`,
  USER_ID: `Некорректный идентификатор пользователя`
};

const schema = Joi.object({
  categories: Joi.array().items(
      Joi.number().integer().positive().messages({
        'number.base': ErrorArticleMessage.CATEGORIES
      })
  ).min(1).required(),
  title: Joi.string().min(30).max(250).required().messages({
    'string.min': ErrorArticleMessage.TITLE_MIN,
    'string.max': ErrorArticleMessage.TITLE_MAX
  }),
  announce: Joi.string().min(30).max(250).required().messages({
    'string.min': ErrorArticleMessage.ANNOUNCE_MIN,
    'string.max': ErrorArticleMessage.ANNOUNCE_MAX
  }),
  fullText: Joi.string().messages({
    'string.max': ErrorArticleMessage.FULLTEXT_MAX
  }),
  createdAt: Joi.date().required().messages({
    'date.required': ErrorArticleMessage.DATE_CREATE
  }),
  userId: Joi.number().integer().positive().required().messages({
    'number.base': ErrorArticleMessage.USER_ID
  })
});

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const {error} = schema.validate(newArticle, {abortEarly: false});

  if (error) {
    return res.status(HttpCode.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  return next();
};
