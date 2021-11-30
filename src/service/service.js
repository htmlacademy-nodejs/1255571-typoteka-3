'use strict';

const {Cli} = require(`./cli`);
const {
  VARIABLE_LIST,
} = require(`../constants`);

const userArguments = process.argv.slice(VARIABLE_LIST.USER_ARGV_INDEX);
const [userCommand] = userArguments;

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[VARIABLE_LIST.DEFAULT_COMMAND].run();
  process.exit(VARIABLE_LIST.ExitCode.success);
}

Cli[userCommand].run(userArguments.slice(1));
