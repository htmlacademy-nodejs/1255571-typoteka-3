'use strict';

const {nanoid} = require(`nanoid`);
const {
  VARIABLE_LIST,
} = require(`../../constants`);

class CommentService {
  constructor(articles) {
    this._articles = articles;
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

module.exports = CommentService;
