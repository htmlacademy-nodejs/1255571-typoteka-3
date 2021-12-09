'use strict';

const help = require(`./help`);
const generate = require(`./generate`);
const filldb = require(`./fill`);
const version = require(`./version`);
const server = require(`./server`);


const Cli = {
  [generate.name]: generate,
  [help.name]: help,
  [version.name]: version,
  [server.name]: server,
  [filldb.name]: filldb,
};

module.exports = {
  Cli,
};
