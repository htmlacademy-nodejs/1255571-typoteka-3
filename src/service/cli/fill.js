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
const {getLogger} = require(`../lib/logger`);
const logger = getLogger({name: `api`});

const sequelize = require(`../lib/sequelize`);
const initDatabase = require(`../lib/init-db`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const MAX_COMMENTS = 5;

const users = [
  {
    email: `ivanov@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Иван`,
    lastName: `Иванов`,
    avatar: `avatar-1.png`
  }, {
    email: `petrov@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Пётр`,
    lastName: `Петров`,
    avatar: `avatar-2.png`
  }, {
    email: `ivanova@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Алина`,
    lastName: `Иванова`,
    avatar: `avatar-3.png`
  }, {
    email: `petrova@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Ольга`,
    lastName: `Петрова`,
    avatar: `avatar-4.png`
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
    articleId,
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const getRandomSubarray = (items) => {
  items = items.slice();
  let count = getRandomInt(1, items.length - 1);
  const result = [];
  while (count--) {
    result.push(
        ...items.splice(
            getRandomInt(0, items.length - 1), 1
        )
    );
  }
  return result;
};

const generateArticles = (count, sentences, titles, categories, userCount, comments) => (
  new Array(count).fill({}).map((_, index) => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    announce: shuffle(sentences).slice(1, 3).join(` `),
    fullText: shuffle(sentences).slice(1, 5).join(` `),
    categories: getRandomSubarray(categories),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), index + 1, userCount, comments),
    userId: getRandomInt(1, userCount),
  }))
);

module.exports = {
  name: `--filldb`,
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);

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

    const articles = generateArticles(countArticle, sentences, titles, categories, users.length, commentSentences);

    return initDatabase(sequelize, {articles, categories, users});
  }
};

