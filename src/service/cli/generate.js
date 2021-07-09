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
  DATA_PATH
} = require(`../../constants`);
const moment = require(`moment`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
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

const generateOffers = (count, sentences, titles, categories) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(1, 5).join(` `),
    fullText: shuffle(sentences).slice(1, 5).join(` `),
    createdDate: moment(randomDate(beforeDate, CURRENT_DATE)).format(`YYYY-MM-DD hh:mm:ss`),
    category: [categories[getRandomInt(0, categories.length - 1)]]
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

    const content = JSON.stringify(generateOffers(countOffer, sentences, titles, categories));
    writeFile(content);
  }
};

