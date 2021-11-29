'use strict';

const fs = require(`fs`).promises;
const {VARIABLE_LIST} = require(`../../constants`);
let data = [];

const getMockData = async () => {
  if (data.length > 0) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(VARIABLE_LIST.FILENAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    console.log(err);
    return (err);
  }

  return data;
};

module.exports = {getMockData};
