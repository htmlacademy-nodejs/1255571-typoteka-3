'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  getRandomInt,
  shuffle,
  randomDate,
} = require(`../../utils`);
const {
  ExitCode,
  DATA_PATH,
  MAX_ID_LENGTH,
} = require(`../../constants`);
const moment = require(`moment`);
const {nanoid} = require(`nanoid`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const MAX_COMMENTS = 5;
const FILE_NAME = `mocks.json`;
const CURRENT_DATE = new Date();
let beforeDate = new Date();
beforeDate = beforeDate.setMonth(beforeDate.getMonth() - 3);

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

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateOffers = (count, sentences, titles, categories, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(1, 5).join(` `),
    fullText: shuffle(sentences).slice(1, 5).join(` `),
    createdDate: moment(randomDate(beforeDate, CURRENT_DATE)).format(`YYYY-MM-DD hh:mm:ss`),
    category: [categories[getRandomInt(0, categories.length - 1)]],
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
  }))
);

const writeFile = async (content) => {
  try {
    await fs.writeFile(FILE_NAME, content);
    console.info(chalk.green(`Операция завершена успешно. Файл создан.`));
    process.exit(0);
  } catch (error) {
    console.error(chalk.red(`Не удалось записать данные в файл...`));
    process.exit(ExitCode);
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    if (Number.parseInt(count, 10) >= MAX_COUNT) {
      console.log(chalk.red(`Не больше 1000 объявлений!`));
      process.exit(ExitCode);
    }
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    const sentences = await readFileContent(DATA_PATH.FILE_SENTENCES_PATH);
    const titles = await readFileContent(DATA_PATH.FILE_TITLES_PATH);
    const categories = await readFileContent(DATA_PATH.FILE_CATEGORIES_PATH);
    const comments = await readFileContent(DATA_PATH.FILE_COMMENTS_PATH);

    const content = JSON.stringify(generateOffers(countOffer, sentences, titles, categories, comments));
    writeFile(content);
  }
};

