'use strict';

const chalk = require(`chalk`);

const textHelp = `
Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    service.js <command>

    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --filldb <count>    формирует тестовые данные
    --server <count>      запускает сервер, порт по умолчанию - 3000
`;

module.exports = {
  name: `--help`,
  run() {
    console.log(chalk.grey(textHelp));
  }
};
