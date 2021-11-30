'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  find(title) {
    const articles = this._articles.filter((item) => item.title.toUpperCase().includes(title.toUpperCase()));

    return articles;
  }
}

module.exports = SearchService;
