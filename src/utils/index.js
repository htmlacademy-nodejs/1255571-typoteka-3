'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const randomDate = (start, end) => {
  const date = new Date(+start + Math.random() * (end - start));
  return date;
};

const ensureArray = (value) => Array.isArray(value) ? value : [value];

const getPictureFileName = (number) => `item${(`0` + number).slice(-2)}.jpg`;

const prepareErrors = (errors) => {
  return errors.response.data.split(`\n`);
};

module.exports = {
  getRandomInt,
  shuffle,
  randomDate,
  ensureArray,
  getPictureFileName,
  prepareErrors,
};
