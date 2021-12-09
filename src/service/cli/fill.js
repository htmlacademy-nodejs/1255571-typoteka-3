'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  getRandomInt,
  shuffle,
  getPictureFileName,
} = require(`../../utils`);
const {
  VARIABLE_LIST,
  DATA_PATH,
  PictureRestrict,
} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const MAX_COMMENTS = 5;
const FILE_NAME = `fill-db.sql`;

const users = [
  {
    email: `ivanov@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Иван`,
    lastName: `Иванов`,
    avatar: `avatar1.jpg`
  }, {
    email: `petrov@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Пётр`,
    lastName: `Петров`,
    avatar: `avatar2.jpg`
  }
];

const readFileContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(`
    Во время чтения файла произошла ошибка - ${err}.
    `));
    return [];
  }
};

const generateComments = (count, articleId, userCount, comments) => (
  new Array(count).fill({}).map(() => ({
    userId: getRandomInt(1, userCount),
    articleId: articleId,
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generatearticles = (count, sentences, titles, categoryCount, userCount, comments) => (
  new Array(count).fill({}).map((_, index) => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    announce: shuffle(sentences).slice(1, 5).join(` `),
    fullText: shuffle(sentences).slice(1, 5).join(` `),
    category: [getRandomInt(1, categoryCount)],
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), index + 1, userCount, comments),
    userId: getRandomInt(1, userCount),
  }))
);

const writeFile = async (content) => {
  try {
    await fs.writeFile(FILE_NAME, content);
    console.info(chalk.green(`Операция завершена успешно. Файл создан.`));
    process.exit(0);
  } catch (error) {
    console.error(chalk.red(`Не удалось записать данные в файл...`));
    process.exit(VARIABLE_LIST.ExitCode);
  }
};

module.exports = {
  name: `--filldb`,
  async run(args) {
    const [count] = args;
    if (Number.parseInt(count, 10) >= MAX_COUNT) {
      console.log(chalk.red(`Не больше 1000 объявлений!`));
      process.exit(VARIABLE_LIST.ExitCode);
    }
    const countArticle = Number.parseInt(count, 10) || DEFAULT_COUNT;

    const sentences = await readFileContent(DATA_PATH.FILE_SENTENCES_PATH);
    const titles = await readFileContent(DATA_PATH.FILE_TITLES_PATH);
    const categories = await readFileContent(DATA_PATH.FILE_CATEGORIES_PATH);
    const commentSentences = await readFileContent(DATA_PATH.FILE_COMMENTS_PATH);

    const articles = generatearticles(countArticle, sentences, titles, categories.length, users.length, commentSentences);
    const comments = articles.flatMap((article) => article.comments);
    const articleCategories = articles.map((article, index) => ({articleId: index + 1, categoryId: article.category[0]}));

    const userValues = users.map(
      ({email, passwordHash, firstName, lastName, avatar}) =>
        `('${email}', '${passwordHash}', '${firstName}', '${lastName}', '${avatar}')`
    ).join(`,\n`);

    const categoryValues = categories.map((name) => `('${name}')`).join(`,\n`);

    const articleValues = articles.map(
      ({title, announce, fullText, picture, userId}) =>
        `(${userId}, '${title}', '${picture}', '${announce}', '${fullText}')`
    ).join(`,\n`);

    const articleCategoryValues = articleCategories.map(
      ({articleId, categoryId}) =>
        `(${articleId}, ${categoryId})`
    ).join(`,\n`);

    const commentValues = comments.map(
      ({text, userId, articleId}) =>
        `(${articleId}, ${userId}, '${text}')`
    ).join(`,\n`);

    const content = `
INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
${userValues};
INSERT INTO categories(name) VALUES
${categoryValues};
ALTER TABLE articles DISABLE TRIGGER ALL;
INSERT INTO articles(user_id, title, picture, announce, full_text) VALUES
${articleValues};
ALTER TABLE articles ENABLE TRIGGER ALL;
ALTER TABLE articles_categories DISABLE TRIGGER ALL;
INSERT INTO articles_categories(article_id, category_id) VALUES
${articleCategoryValues};
ALTER TABLE articles_categories ENABLE TRIGGER ALL;
ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO COMMENTS(article_id, user_id, text) VALUES
${commentValues};
ALTER TABLE comments ENABLE TRIGGER ALL;`;

    writeFile(content);
  }
};

