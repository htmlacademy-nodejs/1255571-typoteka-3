'use strict';

const help = require(`./help`);
const filldb = require(`./fill`);
const version = require(`./version`);
const server = require(`./server`);


const Cli = {
  [help.name]: help,
  [version.name]: version,
  [server.name]: server,
  [filldb.name]: filldb,
};

module.exports = {
  Cli,
};
