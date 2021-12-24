'use strict';

const {hash, hashSync} = require(`bcrypt`);

const SALT_ROUNDS = 13;

module.exports = {
  hash: (password) => hash(password, SALT_ROUNDS),
  hashSync: (password) => hashSync(password, SALT_ROUNDS)
};
