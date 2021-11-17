'use strict';

const {nanoid} = require(`nanoid`);
const {
  MAX_ID_LENGTH,
} = require(`../../constants`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = Object
      .assign({id: nanoid(MAX_ID_LENGTH), comments: []}, article);

    this._articles.push(newArticle);
    return newArticle;
  }

  drop(id) {
    const article = this._articles.find((item) => item.id === id);

    if (!article) {
      return null;
    }

    this._articles = this._articles.filter((item) => item.id !== id);
    return article;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((item) => item.id === id);
  }

  update(id, article) {
    const oldArticle = this._articles
      .find((item) => item.id === id);

    return Object.assign(oldArticle, article);
  }

  createComment(article, comment) {
    const oldArticle = this._articles
      .find((item) => item.id === article.id);

    const newComment = Object
      .assign({id: nanoid(MAX_ID_LENGTH)}, comment);

    const newArticle = oldArticle.comments.push(newComment);

    return Object.assign(oldArticle, newArticle);
  }

  dropComment(articleId, commentId) {
    const article = this._articles.find((item) => item.id === articleId);
    if (!article) {
      return null;
    }

    const comment = article.comments.find((item) => item.id === commentId);
    if (!comment) {
      return null;
    }

    this._articles = this._articles.forEach((item) => {
      if (item.id === articleId) {
        item.comments.filter((commentItem) => commentItem.id !== commentId);
      }
    });
    return commentId;
  }
}

module.exports = ArticleService;
